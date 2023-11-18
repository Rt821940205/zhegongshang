<template>
  <view class="search-container">
    <view class="search-box">
      <u-search
        placeholder="请输入内容"
        v-model="keyword"
        :clearabled="true"
        bgColor="#fffff00"
        @custom="onSearch"
        @search="onSearch"
      >
      </u-search>
      <view
        v-if="!showHistory"
        class="search-history"
        @click="showHistoryKeyword"
        >搜索历史</view
      >
      <view v-else>
        <view class="list">
          <u-tag
            v-for="(item, index) in historyKeyword"
            :key="index"
            :text="item"
            size="mini"
            border-color="#557ff7"
            color="#557ff7"
            plain
          ></u-tag>
        </view>
        <view class="search-clear" @click="clearAll">清空历史记录</view>
      </view>
      <view class="search-notfound">搜索不到您的成果？</view>
      <view class="search-tofind" @click="show = true"
        >点击此处在系统补全您的成果</view
      >
      <u-modal
        :show="show"
        :title="title"
        :showCancelButton="true"
        @cancel="show = false"
        @confirm="confirm"
        confirmColor="#557ff7"
      >
        <view class="completion_content">
          <view class="completion_p"
            >请填入您的联系邮箱，系统将发送成果补全页面链接至您的邮箱</view
          >
          <u--input
            placeholder="请输入邮箱"
            border="surround"
            v-model="email"
          ></u--input>
          <view class="completion_p">链接有效期：72小时</view>
        </view>
      </u-modal>
      <u-toast ref="uToast"></u-toast>
    </view>
  </view>
</template>

<script>
import Api from "@/server/index.js";
import { checkEmail, trim } from "@/utils/common.js";
export default {
  name: "seachInput",
  props: {
    achievementList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      keyword: "",
      show: false,
      title: "成果补全",
      email: "",
      historyKeyword: uni.getStorageSync("historyKeyword") || [],
      showHistory: false,
    };
  },
  computed: {},
  methods: {
    checkEmail,
    trim,
    onSearch() {
      this.$emit("onSearch", this.keyword);
      this.historyKeyword.push(this.keyword);
      uni.setStorageSync("historyKeyword", this.historyKeyword);
    },
    async findCompleteResource(params) {
      try {
        const res = await Api.completeResource(params);
        if (res.code === 1) {
          this.$refs.uToast.show({ message: res.msg });
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.show = false;
      }
    },
    showHistoryKeyword() {
      this.showHistory = true;
    },
    clearAll() {
      this.historyKeyword = [];
      uni.setStorageSync("historyKeyword", this.historyKeyword);
      this.showHistory = false;
    },
    confirm() {
      const { email } = this;
      if (!this.checkEmail(email)) {
        this.$refs.uToast.show({
          type: "error",
          message: "请输入正确的邮箱账号",
        });
        return;
      }
      const params = {
        content: " ",
        email: this.trim(email),
      };
      this.findCompleteResource(params);
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {
   
  },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.search-container {
  display: flex;
  justify-content: center;
  padding-bottom: 4rpx;
  ::v-deep .search-box {
    width: 80%;
    text-align: center;
    .uni-input-input {
      border-bottom: 4rpx solid $base-color !important;
      border-radius: 0 !important;
      padding-left: 0;
    }
    .u-search__action {
      span {
        color: $base-color;
        font-weight: bold;
      }
    }
    .u-toast {
      > view {
        z-index: 10080 !important;
      }
    }
  }
  .search-history {
    color: $base-color;
    line-height: 59rpx;
    font-size: $uni-font-size-base;
    font-weight: bolder;
    margin-top: $uni-spacing-col-sm;
  }
  .search-clear {
    color: $main-color;
    font-size: $uni-font-size-sm;
  }
  .search-notfound {
    color: $base-color;
    line-height: 59rpx;
    font-size: $uni-font-size-base;
    font-weight: bolder;
    margin-top: $uni-spacing-col-hg;
  }
  .search-tofind {
    width: 400rpx;
    height: 80rpx;
    line-height: 80rpx;
    border: 4rpx solid $base-color;
    font-weight: bold;
    color: $base-color;
    font-size: $uni-font-size-base;
    margin: $uni-spacing-col-sm auto;
  }
  .completion_content {
    padding: $uni-spacing-col-lg;
    .completion_p {
      color: $base-color;
      font-size: $uni-font-size-base;
      margin: $uni-spacing-col-base 0;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: $uni-spacing-col-lm;

    > view {
      margin-right: 20rpx;
      margin-bottom: 10rpx;
    }
  }
}
</style>

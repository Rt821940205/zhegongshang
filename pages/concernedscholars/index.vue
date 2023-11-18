<template>
  <!-- 关注学者 -->
  <view class="app">
    <view class="header">
      <view class="logo">
        <image src="@/static/schoolBadge.png" />
      </view>
    </view>
    <view class="search-bar">
      <view class="inputView">
        <input
          type="text"
          v-model="theme"
          placeholder="可输入研究关键词或者学者姓名"
        />
      </view>
      <view class="button-view">
        <button type="primary" class="btn" @click="searchDaniu">搜索</button>
      </view>
    </view>
    <view class="seegment-view">
      <button
        type="default"
        plain="true"
        :class="{ 'button-select': selectFirst === true }"
        @click="clickMyFollowList"
      >
        我的关注
      </button>
      <button
        type="default"
        plain="true"
        :class="{ 'button-select': selectFirst === false }"
        @click="clickDaniu"
      >
        校内学者
      </button>
    </view>
    <view class="content">
      <list v-show="selectFirst === true" :list="list" @update:item="toItem" />
      <listdaniu
        v-show="selectFirst === false"
        :list="daniuList"
        @update:item="toFollow"
      />
      <view v-if="loading" class="swiper-loading">
        <u-loading-icon></u-loading-icon>
      </view>
    </view>
  </view>
</template>

<script>
import List from "./list.vue";
import Listdaniu from "./listdaniu.vue";
import Api from "@/server/index.js";
export default {
  components: {
    List,
    Listdaniu,
  },
  data() {
    return {
      list: [],
      daniuList: [],
      selectFirst: true, //默认选择第一个
      theme: "", //搜索关键字,
      loading: false,
      pageNo: 1,
      pageSize: 500,
    };
  },
  async onShow() {
    await this.init();
  },
  methods: {
    init() {
      this.updateFollowList();
    },
    async updateFollowList() {
      const { data } = await Api.getUserBuddyPage({});
      this.list = data;
    },
    async searchDaniu() {
      const { pageNo, pageSize } = this;
      this.selectFirst = false;
      if (!this.theme.length) {
        this.daniuList = [];
        return;
      }
      this.loading = true;
      const { data } = await Api.findScholarByUserId({
        keyWords: this.theme,
        pageNo,
        pageSize,
      });
      this.daniuList = data
      // if (data.length > 0) {
      //   this.daniuList = pageNo === 1 ? data : [...this.daniuList, ...data];
      // }
      this.loading = false;
    },
    async toFollow(id) {
      await Api.addUserBuddy({
        buddyUserId: id,
      });
      uni.showToast({
        title: "关注成功",
      });
      this.updateFollowList();
    },
    toItem(sItem) {
      const { id, buddyId } = sItem;
      uni.navigateTo({
        url: "/pages/compage/scholar-detail?id=" + id + "&buddyId=" + buddyId,
      });
    },
    clickMyFollowList() {
      this.selectFirst = true;
    },
    clickDaniu() {
      this.selectFirst = false;
    },
  },
  onPullDownRefresh() {
    if(this.selectFirst) {
      this.updateFollowList();
    }
    if (!this.selectFirst && this.daniuList.length > 0) {
      this.pageNo = 1;
      this.searchDaniu();
    }
    uni.stopPullDownRefresh();
  },
  // onReachBottom() {
  //   if (!this.loading) {
  //     this.pageNo++;
  //     this.searchDaniu();
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.app {
  .header {
    padding: $zgd-logo-padding;
    .logo {
      image {
        width: $zgd-logo-w;
        height: $zgd-logo-h;
      }
    }
  }
  .search-bar {
    display: flex;
    box-sizing: border-box;
    padding: 0 36rpx 0;
    height: 100rpx;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    .inputView {
      border-radius: 30rpx;
      border: 2rpx solid $base-color;
      width: 80%;
      ::v-deep .uni-input-placeholder {
        padding-left: $uni-spacing-row-lg;
      }
      ::v-deep .uni-input-input {
        padding-left: $uni-spacing-row-lg;
      }
      input {
        font-size: $uni-font-size-base;
        height: 60rpx;
      }
    }
    .button-view {
      margin-left: $uni-spacing-row-base;
      height: 60rpx;
      width: 20%;
      button {
        font-size: $uni-font-size-base;
        width: 100%;
        line-height: 60rpx;
        background-color: $base-color;
      }
    }
  }
  .seegment-view {
    box-sizing: border-box;
    justify-content: space-between;
    align-content: center;
    margin-top: $uni-spacing-col-base;
    display: flex;
    height: 60rpx;
    padding: 0 36rpx;

    button {
      font-size: $uni-font-size-base;
      line-height: 60rpx;
      width: 48%;
      border: 2rpx solid $base-color;
      color: $base-color;
    }
    .button-select {
      background: $base-color;
      color: white;
    }
    ::v-deep uni-button {
      margin-left: 0;
      margin-right: 0;
    }
  }
  .content {
    padding: $zgd-content-padding;
  }

  .swiper-loading {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -24rpx;
  }
}
</style>

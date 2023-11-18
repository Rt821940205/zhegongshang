<template>
  <view class="app">
    <view class="header">
      <tNav title="补充信息 - 英文名" />
    </view>
    <view class="content">
      <view class="content__view">
        <view class="title">已添加：</view>
        <view
          v-for="(item, index) in eUserNames"
          :key="index + item.name"
          class="content-item"
        >
          <view>{{ item.name }}</view>
          <view class="content-item-right">
            <u-icon
              v-if="!item.isSelect"
              name="close"
              color="#316B7A"
              size="18"
              @click="remove"
            />
          </view>
        </view>
        <view>
          <view class="search" v-if="showInput">
            <view>
              <u--input
                class="search-input"
                v-model="newUserName"
                placeholder="请输入内容"
              ></u--input>
            </view>
            <view class="search-btn" @click="confirm"> 确定 </view>
          </view>
          <u-icon v-else name="plus" size="18" color="#316B7A" @click="add" />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import Api from "@/server/index.js";
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      newUserName: "",
      showInput: false,
      eUserNames: [],
    };
  },
  computed: {
    ...mapState({
      form: (state) => state.home.user,
    }),
    ...mapGetters({
      tags: "eUserName",
    }),
  },
  watch: {
    tags: {
      handler(newVal) {
        this.eUserNames = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    add() {
      this.showInput = !this.showInput;
    },
    async confirm() {
      if (this.newUserName) {
        //英文名字不能为中文
        const isEnglish = /[^A-Za-z]/g.test(this.newUserName);
        if (isEnglish) {
          return uni.showToast({
            title: "请输入英文",
            icon: "none",
            duration: 3000,
          });
        }
        if (this.eUserNames.find((item) => item.name === this.newUserName)) {
          return uni.showToast({
            title: "名字重复",
            icon: "none",
          });
        }
        this.eUserNames.push({
          name: this.newUserName,
          isSelect: 0,
        });
        this.newUserName = "";
        this.show = !this.show;
        this.form.eUserName = this.eUserNames;
        const { code } = await Api.updateUserByUserNo(this.form);
        const title = code == 1 ? "保存成功" : "保存失败";
        uni.showToast({
          title,
          icon: "none",
        });
      }
    },
    async remove(item) {
      const index = this.eUserNames.findIndex(
        (sItem) => sItem.name === item.name
      );
      this.eUserNames.splice(index, 1);
      this.form.eUserName = this.eUserNames;
      const { code } = await Api.updateUserByUserNo(this.form);
      const title = code == 1 ? "删除成功" : "删除失败";
      uni.showToast({
        title,
        icon: "none",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  .header {
    padding: $zgd-arrow-padding;
  }
  .content {
    padding: 0 50rpx 0 50rpx;
    margin-top: 22rpx;
    &__view {
      border: 1px solid $base-border-color;
      padding: 22rpx 24rpx 22rpx 24rpx;
      .title {
        color: $base-color;
        font-size: $uni-font-size-base;
        margin-bottom: 24rpx;
      }

      .content-item {
        display: flex;
        font-size: $uni-font-size-base;
        margin-bottom: 9rpx;
        .content-item-right {
          margin-left: 40rpx;
        }
      }

      .search {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $base-color;
        font-size: $uni-font-size-base;
        margin-top: 5rpx;
        .search-input {
          width: 200rpx;
        }
        .search-btn {
          flex: 1;
          margin-left: 40rpx;
        }
      }
    }
    .search-input {
      border-bottom: 1px solid $base-color;
      border-radius: 0;
    }
  }
}
</style>

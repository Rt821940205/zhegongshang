<template>
  <view class="container">
    <view class="container-title">
      <view> 我的成果（{{ total }}） </view>
      <view v-if="source" class="right" @click.stop="toList">成果管理</view>
    </view>
    <view class="tabs">
      <u-tabs :list="achievementList" @click="click" @resize="resize" ref="tabs"></u-tabs>
    </view>
    <view class="list" v-if="!loading">
      <view class="list_item" v-for="(item, index) in achievementPageList" :key="index" @click="goAchmentDetail(item)">
        <view class="item_header">
          <view class="item_header_l">{{ index + 1 }}</view>
          <view class="item_header_c">
            <view class="header_c_tit">
              {{ item.title }}
            </view>
            <view class="com_text" v-if="item.cas" style="color: #ad1528">{{ item.cas.toUpperCase() }}</view>
            <view class="com_text" v-if="item.jcr" style="color: #ad1528">{{ item.jcr.toUpperCase() }}</view>
            <view class="com_text">{{ dictionary[item.resourceCode] }}</view>
            <view class="com_text">{{
              keyWordTran(item.creatorAll || "")
            }}</view>
            <view class="com_text">{{ keyWordTran(item.keyword || "") }}</view>
            <view class="com_text" v-if="item.isHigh === 1 && (item.resourceCode === 'I' || item.resourceCode === 'E')">高被引</view>
            <view class="com_text" v-if="item.isHot === 1 && (item.resourceCode === 'I' || item.resourceCode === 'E')">热点论文</view>
            <view class="com_text" v-if="item.tag === 'Z'">纵向项目</view>
            <view class="com_text" v-if="item.tag === 'H'">横向项目</view>
            <view class="com_text">{{ item.year }}</view>
            <view class="com_text" v-if="item.excellence">{{ item.excellence }}</view>
            <view class="com_text">{{ item.journal }}</view>
          </view>
          <view class="item_header_r" :style="{ opacity: item.isNew ? 1 : 0 }">新！</view>
        </view>
        <view class="item_footer">查看原文</view>
      </view>
      <view class="achment-operate">
        <view>
          <image v-show="showUpImg" src="@/static/home/arrow-up.png" />
          <image v-show="!showUpImg" src="@/static/home/arrow-down.png" />
        </view>
        <view>
          <image src="@/static/home/time_new.png" @click="sortByTime" />
        </view>
      </view>
    </view>
    <view v-else>
      <u-loading-icon></u-loading-icon>
    </view>
  </view>
</template>

<script>
import { keyWordTran } from "@/utils/common.js";
import { dictionary } from "@/utils/dic.js";
export default {
  data() {
    return {
      loading: true,
      showUpImg: true,
      dictionary
    };
  },
  props: {
    source: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    achievementList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    achievementPageList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  computed: {
    total() {
      return this.achievementList.reduce(
        (pre, next) => pre + +next.badge.value,
        0
      );
    },
  },
  watch: {
    achievementList: {
      handler(newVal) {
        this.loading = !newVal.length ? true : false;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    resize() {
      const clientWidth = this.$refs.tabs.$el.clientWidth;
      const rects = this.$refs.tabs.list;
      const sum = rects.reduce((pre, cur) => {
        return pre + cur.rect.width;
      }, 0);
      if (clientWidth > sum) {
        this.$refs.tabs.$el.querySelector(
          ".u-tabs__wrapper__nav__item"
        ).style.marginLeft = (clientWidth - sum) / 2 + "px";
        this.$refs.tabs.$el.querySelector(
          ".u-tabs__wrapper__nav__line"
        ).style.left = (clientWidth - sum) / 2 + "px";
      }
    },
    keyWordTran,
    click(item) {
      this.$emit("findUserResourcePage", item.resourceCode);
    },
    goAchmentDetail(item) {
      const { id, resourceCode } = item;
      uni.navigateTo({
        url: `/pages/compage/achment-detail?id=${id}&code=${resourceCode}`,
      });
    },
    sortByTime() {
      this.showUpImg = !this.showUpImg;
      this.$emit("sortByTime");
    },
    toList() {
      uni.navigateTo({
        url: "/pages/compage/achment-manage",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  .container-title {
    display: flex;
    justify-content: space-between;
    height: 88rpx;
    line-height: 88rpx;
    padding: 0 50rpx;

    view {
      flex: 1;
    }

    .right {
      text-align: right;
    }
  }

  .tabs {
    padding: 0 40rpx 20rpx;
  }

  .list {
    margin-top: $uni-spacing-col-hg;
    position: relative;

    .list_item {
      padding: 30rpx 40rpx 40rpx 56rpx;
      background: -webkit-linear-gradient(top left,
          rgba(75, 195, 226, 0.2) 0%,
          white 30%);
      background: linear-gradient(to bottom right,
          rgba(75, 195, 226, 0.2) 0%,
          white 30%);

      .item_header {
        display: flex;
        justify-content: space-between;

        .item_header_l {
          width: 10%;
        }

        .item_header_c {
          width: 75%;
          font-size: 28rpx;

          .header_c_tit {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .hot_high {
            display: flex;
            justify-content: space-between;
          }

          .com_text {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 20rpx;
            margin-top: 14rpx;
          }
        }

        .item_header_r {
          width: 15%;
          display: flex;
          justify-content: flex-end;
          font-size: 28rpx;
          color: #ad1528;
        }
      }

      .item_footer {
        font-size: 24rpx;
        display: flex;
        justify-content: flex-end;
        color: $base-color;
      }
    }

    .achment-operate {
      display: flex;
      position: absolute;
      top: -50rpx;
      right: $uni-spacing-row-hg;
      gap: 10rpx;

      view {
        flex: 1;

        image {
          width: $uni-img-size-sm;
          height: $uni-img-size-sm;
        }
      }
    }
  }
}
</style>

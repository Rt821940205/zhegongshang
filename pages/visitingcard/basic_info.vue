<template>
  <view class="header">
    <view v-if="source" class="header_t">
      <view class="header_t_l">
        <image src="@/static/home/logo@2x.png"></image>
      </view>
      <view class="header_t_r">
        <image src="@/static/home/QRcode.png" @click.stop="handleQcode"></image>
        <image
          src="@/static/home/update.png"
          @click.stop="handleUpdate"
        ></image>
      </view>
    </view>
    <view v-else class="header_t">
      <view class="header_t_l" @click="goBack">返回</view>
      <view class="header_t_r" @click="cancelFollow">取消关注</view>
    </view>
    <view class="header_c">
      <view class="header_c_l">
        <image :src="basicInfo.userImg" v-if="basicInfo.userImg" />
        <image
          v-if="!basicInfo.userImg"
          src="@/static/home/default-user-header.png"
        ></image>
      </view>
      <view class="header_c_r">
        <view class="name">
          <view class="CN_name">{{ basicInfo.userName }}</view>
          <view v-if="source" class="EN_name">
            <picker :value="index" :range="eUserName" @change="eNamesChange">
              <text class="name_text">{{
                eUserName.length > 0 && eUserName[index] || ''
              }}</text>
              <image src="@/static/home/down_arrow.png" />
            </picker>
          </view>
        </view>
        <view class="com_text">ISNI: {{ basicInfo.userNo }}</view>
        <view class="com_text">{{ basicInfo.jobTitle }}</view>
        <view class="com_text">{{ basicInfo.subject }}</view>
      </view>
    </view>
    <view class="header_b">
      <view class="list" @touchmove.stop @touch.stop>
        <u-tag
          v-for="item in researchDirection"
          :key="item"
          :text="item"
          size="mini"
          bgColor="rgba(255, 255, 255, 0.3)"
          border-color="transparent"
          shape="circle"
        ></u-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    source: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    basicInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    eUserName: {
      type: Array,
      default: function () {
        return [];
      },
    },
    researchDirection: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    cancelFollow() {
      this.$emit("cancelFollow");
    },
    handleShare() {
      // basicInfo
      uni.navigateTo({
        url: "/pages/compage/share",
      });
    },
    handleQcode() {
      uni.navigateTo({
        url: "/pages/compage/qcode?sn=" + this.basicInfo.userNo,
      });
    },
    handleUpdate() {
      uni.navigateTo({
        url: "/pages/compage/modify-data",
      });
    },
    eNamesChange(e) {
      this.$emit("update:ename", this.eUserName[e.target.value]);
    },
  },
  watch: {
    basicInfo: {
      handler(newName, oleName) {
        if (!!newName.eUserName) {
          const eNames = JSON.parse(JSON.stringify(newName.eUserName));
          const index = eNames.findIndex((item) => item.isSelect != 0);
          this.index = index;
          const removed = eNames.splice(index, 1);
          eNames.unshift(removed[0]);
          this.eNames = eNames.map((item) => item.name);
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background: -webkit-linear-gradient(bottom left, #316b7a, #85abb3);
  background: linear-gradient(to top right, #316b7a, #85abb3);
  padding: 44rpx 36rpx;

  .header_t {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $base-color;

    .header_t_l {
      image {
        width: 245rpx;
        height: 50rpx;
      }
    }

    .header_t_r {
      width: 150rpx;
      display: flex;
      justify-content: flex-end;
      gap: $uni-spacing-row-lg;
      image {
        width: $uni-img-size-mini;
        height: $uni-img-size-mini;
      }
    }
  }

  .header_c {
    margin-top: 20rpx;
    display: flex;
    align-items: center;

    .header_c_l {
      margin-right: 35rpx;

      image {
        width: 150rpx;
        height: 160rpx;
      }
    }

    .header_c_r {
      color: #ffffff;

      .name {
        display: flex;
        align-items: center;

        .CN_name {
          font-size: 32rpx;
          margin-right: 40rpx;
        }

        .EN_name {
          display: flex;
          align-items: center;

          .name_text {
            font-size: 32rpx;
            margin-right: 10rpx;
          }

          image {
            width: 20rpx;
            height: 20rpx;
          }
        }
      }

      .com_text {
        font-size: 24rpx;
        margin-bottom: 5rpx;
      }
    }
  }

  .header_b {
    width: 100%;
    margin-top: 20rpx;
    padding-bottom: 20rpx;

    .list {
      display: flex;
      flex-wrap: wrap;
      height: 200rpx;
      overflow-y: scroll;

      > view {
        margin-right: 20rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>

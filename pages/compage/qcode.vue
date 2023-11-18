<template>
  <view class="app">
    <view class="header">
      <tNav title="我的二维码" color="white" />
    </view>
    <view class="content">
      <view class="content-info">
        <view class="logo">
          <image src="@/static/home/logo1@2x.png" />
        </view>
        <view class="user">
          <view class="user__pic">
            <image :src="userInfo.userImg" />
          </view>
          <view>
            <view
              ><text>{{ userInfo.userName }}</text
              >{{ getEName(userInfo.eUserName) }}</view
            >
            <view>{{ userInfo.jobTitle }}</view>
            <view>{{ userInfo.subject }}</view>
          </view>
        </view>
        <view class="qrimg">
          <tki-qrcode
            ref="qrcode"
            :cid="cid"
            :val="val"
            :size="size"
            :unit="unit"
            :background="background"
            :foreground="foreground"
            :pdground="pdground"
          />
        </view>
      </view>
    </view>
    <view class="des">
      <view>扫一扫，访问我的主页</view>
      <view>长按保存名片到相册</view>
    </view>
  </view>
</template>
<script>
import Api from "@/server/index.js";
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
export default {
  components: {
    tkiQrcode,
  },
  data() {
    return {
      userInfo: {},
      cid: "qcode1",
      val: "",
      size: 200,
      unit: "px",
      background: "#316B7A",
      foreground: "#ffffff",
      pdground: "#ffffff",
    };
  },
  onLoad(option) {
    this.val = option.sn;
  },
  async mounted() {
    await this.init();
    await this.$nextTick();
    this.bindQRCode();
  },
  methods: {
    async init() {
      await this.getUserByUserNo();
    },
    async getUserByUserNo() {
      const params = { userNo: this.val };
      const { data } = await Api.getUserByUserNo(params);
      this.userInfo = data;
    },
    getEName(eNames) {
      if (eNames) {
        const _eNames = JSON.parse(eNames);
        return _eNames.find((item) => !!item.isSelect).name;
      }
    },
    bindQRCode() {
      this.$refs.qrcode._makeCode();
    }
  },
};
</script>
<style lang="scss" scoped>
.uni-page-body, page {
  height: 100%;
}
.app {
  height: 100%;
  background: linear-gradient(to bottom, #85abb3, #316b7a);
  .header {
    padding: $zgd-arrow-padding;
  }
  .content {
    padding: $zgd-content-padding;
    .content-info {
      padding: $uni-spacing-col-lm;
      background: white;
      .logo {
        image {
          width: $zgd-logo-w;
          height: $zgd-logo-h;
        }
      }
      .user {
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1rpx solid #85abb3;
        margin-top: $uni-spacing-col-hg;
        padding-bottom: $uni-spacing-col-hg;
        &__pic {
          image {
            width: $uni-img-size-hg;
            height: $uni-img-size-hg;
          }
        }
        > view:last-child {
          display: flex;
          flex-flow: column nowrap;
          margin-left: $uni-spacing-row-lg;
          view {
            flex: 1;
            font-size: $uni-font-size-base;
          }
          text {
            font-size: $uni-font-size-lm;
            margin-right: $uni-spacing-row-base;
          }
        }
      }
      .qrimg {
        padding: $uni-img-size-lm 0;
        text-align: center;

        ::v-deep .tki-qrcode uni-image {
          border: 5rpx solid $main-color;
          padding: 25rpx;
        }
      }
    }
  }
  .des {
    color: white;
    text-align: center;
    font-size: $uni-font-size-lg;
    >view {
      margin-top: 20rpx;
    }
  }
}
</style>

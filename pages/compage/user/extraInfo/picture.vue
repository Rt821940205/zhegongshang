<template>
  <view class="app">
    <view class="header">
      <tNav title="补充信息 - 头像" />
    </view>
    <view class="content">
      <view class="content__view">
        <view class="teacher-header">
          <image :src="imag" />
        </view>
        <view @click="chose">
          点击拍照或者从相册选择
        </view>
      </view>
    </view>
  </view>
</template>
  <script>
import Api from "@/server/index.js";
import { pathToBase64 } from "utils/loadPic.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      imag: "",
      size: 200,
    };
  },
  computed: {
    ...mapState({
      form: (state) => state.home.user,
    }),
  },
  mounted() {
    this.imag = this.form.userImg;
  },
  methods: {
    chose() {
      uni.chooseImage({
        count: 1,
        sizeType: "compressed",
        sourceType: ["camera", "album"],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          const filePath = tempFilePaths[0];
          const size = res.tempFiles[0].size;
          if (size > 1024 * this.size) {
            return uni.showToast({
              title: "头像不能超过" + this.size + "k",
              icon: "none",
            });
          }
          pathToBase64(filePath).then((base64) => {
            this.form.userImg = base64;
            Api.updateUserByUserNo(this.form)
              .then(({ code }) => {
                if (code == 1) {
                  this.imag = base64;
                  uni.showToast({
                    title: "上传成功",
                    icon: "none",
                  });
                } else {
                  throw new Error("上传失败!");
                }
              })
              .catch((err) => {
                uni.showToast({
                  title: "上传失败",
                  icon: "none",
                });
              });
          });
        },
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
    padding: $zgd-content-padding;
    margin-top: 22rpx;
    &__view {
      border: 1px solid $base-border-color;
      padding: 22rpx 24rpx 22rpx 24rpx;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      .teacher-header {
        height: 446rpx;
        font-size: 0;
        padding: 70rpx 0 70rpx 0;
        image {
          width: 446rpx;
          height: 446rpx;
        }
      }
      view:not(:first-child) {
        color: $base-color;
        font-size: $uni-font-size-base;
        height: 68rpx;
        line-height: 68rpx;
      }
    }
  }
}
</style>
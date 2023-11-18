<template>
  <view class="extraInfo">
    <view class="title">完善信息可帮助您拓展科研合作和精准学术文献推送。</view>
    <view class="extraInfo-item1">
      <view>头像</view>
      <view class="extraInfo-left">
        <view>
          <image
            class="extraInfo-item1-img"
            :src="form.userImg"
          />
        </view>
        <view>
          <u-icon
            name="arrow-right"
            color="#316B7A"
            size="18"
            @click="toHeader"
          />
        </view>
      </view>
    </view>
    <view class="extraInfo-item1 extraInfo-item2">
      <view>研究方向</view>
      <view class="extraInfo-left">
        <view>{{ researchDirectionCount }}个</view>
        <view>
          <u-icon
            name="arrow-right"
            color="#316B7A"
            size="18"
            @click="toResearchDirection"
          />
        </view>
      </view>
      <text class="text">补全研究方向，有助于为您推荐科研项目，拓展科研合作</text>
    </view>
    <view class="extraInfo-item1 extraInfo-item2">
      <view>英文名</view>
      <view class="extraInfo-left">
        <view>{{ eUserNameCount }}个</view>
        <view>
          <u-icon
            name="arrow-right"
            color="#316B7A"
            size="18"
            @click="toEnglishName"
          />
        </view>
      </view>
      <text class="text">补全使用英文名，有助于发现您更多的研究成果</text>
    </view>
    <view class="extraInfo-item1 nobottom">
      <view>个人简介</view>
      <view
        v-if="!isShowProfile"
        class="bottom"
      >
        <view>{{ form.userDetail }}</view>
        <view class="btn">
          <image
            class="extraInfo-img"
            src="@/static/common/update@2x.png"
            @click="toEditPersonalProfile"
          />
        </view>
      </view>
      <view
        v-else
        class="bottom"
      >
        <u--textarea
          v-model="form.userDetail"
          placeholder="补全个人简历有助于您的学术交流和科研合作。"
          class="border"
        />
        <view
          class="btn"
          @click.stop="confirm"
        >
          确定
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
      isShowProfile: false,
      rules: Object.freeze({
        userDetail: {
          rules: [
            {
              required: true,
              errorMessage: "请输入个人简介",
            },
          ],
        },
      }),
    };
  },
  computed: {
    ...mapState({
      form: (state) => state.home.user,
    }),
    ...mapGetters({
      researchDirectionCount: "researchDirectionCounts",
      eUserNameCount: "eUserNames",
    }),
  },
  methods: {
    toHeader() {
      uni.navigateTo({
        url: "/pages/compage/user/extraInfo/picture",
      });
    },
    toResearchDirection() {
      uni.navigateTo({
        url: "/pages/compage/user/extraInfo/researchDirection",
      });
    },
    toEnglishName() {
      uni.navigateTo({
        url: "/pages/compage/user/extraInfo/englishName",
      });
    },
    toEditPersonalProfile() {
      this.isShowProfile = !this.isShowProfile;
    },
    async confirm() {
      await Api.updateUserByUserNo(this.form);
      this.isShowProfile = !this.isShowProfile;
    },
  },
};
</script>
  <style lang="scss" scoped>
.extraInfo {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 36rpx;
  padding: 22rpx 8rpx 22rpx 8rpx;
  .title {
    color: $base-color;
    font-size: $uni-font-size-base;
    margin-bottom: $uni-spacing-col-base;
  }
  .extraInfo-item1 {
    display: flex;
    align-items: center;
    font-size: $uni-font-size-base;
    border-bottom: 2rpx dashed $base-border-color;
    margin-bottom: $uni-spacing-col-lm;
    .extraInfo-left {
      margin-left: auto;
      display: flex;
      align-items: center;
    }
    .extraInfo-item1-img {
      width: $uni-img-size-lm;
      height: $uni-img-size-lm;
    }

    .extraInfo-img {
      width: $uni-img-size-mini;
      height: $uni-img-size-mini;
    }
  }

  .extraInfo-item2 {
    position: relative;
    padding-bottom: $uni-font-size-lg;

    .text {
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: $uni-font-size-sm;
      color: $base-chart-color;
    }
  }
  .nobottom {
    border-bottom: none;
  }

  .bottom {
    flex: 1;
  }
  .btn {
    text-align: right;
    margin-top: $uni-spacing-col-base;
    margin-right: $uni-spacing-col-base;
  }
  .border {
    ::v-deep {
      // .uni-textarea-textarea {
        border: 1px solid $base-color;
        border-radius: $uni-border-radius-sm;
        margin-left: $uni-spacing-row-sm;
      // }
    }
  }
}
</style>
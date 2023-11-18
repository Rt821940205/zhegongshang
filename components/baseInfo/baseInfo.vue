<template>
  <view class="basicInfo">
    <view class="title"
      >以下信息来自校数据中心，若有误可进行编辑或者联系学校信息办。</view
    >
    <view class="basicInfo-item">
      <view>姓名</view>
      <view>{{ form.userName }}</view>
    </view>
    <view class="basicInfo-item">
      <view>所在学校（部门）</view>
      <view class="">{{ form.institute }}</view>
    </view>
    <view class="basicInfo-item" style="position: relative">
      <view>学科</view>
      <view class="icon-item">
        <u-icon
          name="arrow-right"
          color="#316B7A"
          size="18"
          @click="toSubject"
        />
      </view>
      <view class="item-right-padding">{{ form.subject }}</view>
    </view>
    <view class="basicInfo-item">
      <view>手机号</view>
      <view>{{ form.phone }}</view>
    </view>
    <view class="basicInfo-item" style="position: relative">
      <view>学校邮箱</view>
      <view class="icon-item">
        <image
          class="extraInfo-img"
          src="@/static/common/update@2x.png"
          @click="toEditPersonalProfile"
          v-if="!isShowProfile"
        />
        <text @click.stop="saveEmail" v-else>确定</text>
      </view>
      <view class="item-right-padding">
        <u--input
          v-if="isShowProfile"
          class="search-input"
          placeholder="请输入内容"
          v-model="form.email"
          border="bottom"
          clearable
          autofocus="autofocus"
        ></u--input>
        <text v-else> {{ form.email }}</text>
      </view>
    </view>
    <view class="basicInfo-item last-item">
      <view>联系地址</view>
      <view>{{ form.address }}</view>
    </view>
  </view>
</template>
<script>
import Api from "@/server/index.js";
export default {
  data() {
    return {
      isShowProfile: false,
    };
  },
  methods: {
    toSubject() {
      uni.navigateTo({
        url:
          "/pages/compage/user/extraInfo/researchDirection?tagsName=" +
          "subject" +
          "&title=" +
          "补充信息 - 学科信息",
      });
    },
    async saveEmail() {
      await Api.updateUserByUserNo(this.form);
      this.isShowProfile = false;
    },
    toEditPersonalProfile() {
      this.isShowProfile = true;
    },
  },
  computed: {
    form() {
      return this.$store.state.home.user;
    },
  },
};
</script>
<style lang="scss" scoped>
.basicInfo {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 36rpx;
  padding: 22rpx 8rpx 22rpx 8rpx;
  .title {
    color: $base-color;
    font-size: $uni-font-size-base;
    margin-bottom: $uni-spacing-col-base;
  }

  .basicInfo-item {
    display: flex;
    justify-content: space-between;
    font-size: $uni-font-size-base;
    margin-bottom: $uni-spacing-col-lm;
    border-bottom: 2rpx dashed $base-border-color;
    height: 60rpx;
    line-height: 60rpx;
    > view:last-child {
      text-align: right;
      width: 60%;
      @include ellipsis();
    }
  }
  .icon-item {
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    top: 50%;
  }

  .extraInfo-img {
    width: $uni-img-size-mini;
    height: $uni-img-size-mini;
  }

  .last-item {
    border-bottom: none;
  }

  //::v-deep .search-input {
    //input {
      //border-bottom: 1px solid $base-color;
    //}
  //}

  .item-right-padding {
    padding-right: $uni-img-size-sm;
  }
}
</style>

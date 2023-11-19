<template>
  <view class="resultItem-container">
    <view class="resultItem-index">
      <text>{{ index }}</text>
    </view>
    <view class="resultItem-left">
      <u-form labelPosition="left">
        <u-form-item label="标题">
          <u-text
            :text="detail.title"
            :bold="true"
            class="u-text"
          ></u-text>
        </u-form-item>
        <u-form-item label="类型">
          <u-text
            :text="detail.type"
            :bold="true"
          ></u-text>
        </u-form-item>
        <u-form-item label="时间">
          <u-text
            :text="detail.time"
            :bold="true"
          ></u-text>
        </u-form-item>
        <u-form-item label="作者">
          <u-text
            :text="detail.author"
            :bold="true"
          ></u-text>
        </u-form-item>
      </u-form>
    </view>

    <view class="resultItem-right">
      <text
        class="right-text"
        @click.stop="handleClaim"
        v-if="showBtns.includes('claim')"
      >认领</text>
      <text
        class="right-text"
        @click.stop="handleDetail"
        v-if="showBtns.includes('detail')"
      >详情</text>
      <text
        class="right-text"
        @click.stop="handleView"
        v-if="showBtns.includes('view')"
      >标为已查看</text>
    </view>

  </view>
</template>

<script>
export default {
  name: "resultItem",
  props: {
    detail: {
      type: Object,
      required: true,
    },
    index: {
      type: String | Number,
      required: true,
    },
    showBtns: {
      type: Array,
      required: false,
      default: () => {
        return ["claim", "detail"];
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    // 认领
    handleClaim() {
      this.$emit("claim");
      uni.navigateTo({
        url: "/pages/claim/claim?id=",
      });
    },
    //  详细
    handleDetail() {
      this.$emit("detail");
    },
    // 标为已经
    handleView() {
      this.$emit("view");
    },
  },
};
</script>

<style scoped lang="scss">
.resultItem-container {
  position: relative;
  border: 3rpx solid $base-color;
  padding: 24rpx 24rpx 6rpx 60rpx;
  background: linear-gradient(
    to bottom right,
    rgba(85, 127, 247, 0.2) 0%,
    rgba(255, 255, 255, 1) 30%
  );

  .resultItem-index {
    position: absolute;
    left: 10rpx;
    font-size: $uni-font-size-base;
    color: $base-color;
  }

  ::v-deep .u-text {
    span {
      display: block;
      width: 438rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  ::v-deep .resultItem-left {
    font-size: $uni-font-size-sm !important;
    .u-form-item__body {
      padding: 0;
    }
  }

  ::v-deep .resultItem-right {
    position: absolute;
    top: 24rpx;
    right: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 53rpx);

    .right-text {
      font-size: 22rpx;
      font-weight: 500;
      color: $base-color;
      // line-height: 59rpx;
    }
  }
}
</style>
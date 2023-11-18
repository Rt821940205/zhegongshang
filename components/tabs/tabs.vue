<template>
  <view class="tabs">
    <view
      :class="{ active: tabIndex === index, 'tabs-item': true }"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="tabChange(index)"
      >{{ tab.name }}
    </view>
  </view>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => [],
    },
    tabIndex: {
      type: String | Number,
      required: true,
      default: 0,
    },
  },
  methods: {
    tabChange(index) {
      this.$emit("tabChange", index);
    },
  },
};
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 60rpx;
  .tabs-item {
    font-size: 30rpx;
    color: $main-color;
    width: 33%;
    text-align: center;
  }
  .active {
    color: $base-color;
    position: relative;
    font-weight: bold;
    &::after {
      content: "";
      position: absolute;
      width: 150rpx;
      height: 4rpx;
      background-color: $base-color;
      left: 50%;
      bottom: -20rpx;
      margin-left: -75rpx;
    }
  }
}
</style>

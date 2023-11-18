<template>
  <view class="container">
    <view class="header">
      <t-nav title="修改信息"></t-nav>
    </view>
    <view class="content">
      <tabs
        @tabChange="tabChange"
        :tabs="tabs"
        :tabIndex="tabIndex"
      ></tabs>
      <view>
        <view v-if="tabIndex == 0">
          <baseInfo />
        </view>
        <view v-else-if="tabIndex == 1">
          <extrInfo />
        </view>
        <view v-else>
          <extra-resum />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import tNav from "@/components/tNav/tNav";
import tabs from "@/components/tabs/tabs";
import baseInfo from "@/components/baseInfo/baseInfo";
import extrInfo from "@/components/extrInfo/extrInfo";
import extraResum from "@/components/extraResum/extraResum";

export default {
  components: {
    tNav,
    baseInfo,
    tabs,
    extrInfo,
    extraResum,
  },
  data() {
    return {
      tabs: [{ name: "基本信息" }, { name: "完善信息" }, { name: "完善履历" }],
      tabIndex: 0,
    };
  },
  methods: {
    tabChange(index) {
      this.tabIndex = index;
    },
  },
};
</script>

<style lang="scss">
.container {
  .header {
    padding: $zgd-arrow-padding;
  }
  .content {
    padding: $zgd-content-padding;
    .title {
      color: $base-color;
      font-size: $uni-font-size-title;
      text-align: center;
      padding-bottom: 20rpx;
      margin-bottom: 20rpx;
      border-bottom: 1px solid;
      border-image: linear-gradient(
          270deg,
          rgba(255, 255, 255, 1),
          rgba(49, 107, 122, 1)
        )
        1 1;
    }
  }
}
</style>

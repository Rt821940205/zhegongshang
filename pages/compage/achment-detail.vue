<template>
  <view class="app">
    <tNav title="成果详情" />
    <view class="detail_dis" v-for="item in list" :key="item.name">
      <view class="detail_left">
        {{ item.name || "暂无数据" }}
      </view>
      <view class="detail_right">
        {{ item.content || "暂无数据" }}
      </view>
    </view>
  </view>
</template>
<script>
import Api from "@/server/index.js";
import { keyWordTran } from "@/utils/common.js";
import { achmentDetailDic } from "@/utils/dic.js";
import { dictionary } from "@/utils/dic.js";
export default {
  data() {
    return {
      id: "",
      list: [],
    };
  },
  onLoad(option) {
    this.findResourceById(option);
  },

  methods: {
    keyWordTran,
    async findResourceById(option) {
      try {
        const res = await Api.getResourceById(option);
        if (res.code === 1) {
          const { data } = res;
          const detail = {
            ...data,
            type: dictionary[data.resourceCode],
            tag: data.tag === 'Z' ? '纵向项目' : '横向项目',
            cas: data?.cas?.toUpperCase(),
            jcr: data?.jcr?.toUpperCase(),
            zzed: data.tag === 'H' ?
              data.contractAmount :
              data.tag === 'Z' ?
                data.totalFunding : ''
          };
          const metchCode = (option.code === "I" || option.code === "E" || option.code === "U") ? "I" : option.code;
          const initArr = Array.from(achmentDetailDic[metchCode]);
          // const finalArr = initArr.map((f) => ({
          //   name: f["name"] || '2',
          //   content:
          //     f.index === "keyword"
          //       ? this.keyWordTran(data[f["index"]])
          //       : data[f["index"]],
          // }));
          const finalArr = initArr.map((f) => ({
            name: f["name"],
            content: detail[f["index"]],
          }));
          this.list = finalArr;
        }
      } catch (e) { }
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  padding: 44rpx 36rpx 0 36rpx;

  .detail_dis {
    display: flex;
    margin-bottom: 30rpx;
    justify-content: space-between;
    font-family: PingFangSC-Medium, sans-serif;
    padding: 0 12rpx;

    .detail_left {
      color: $base-color;
      font-size: $uni-font-size-lg;
      font-weight: 500;
      line-height: 25px;
    }

    .detail_right {
      width: 450rpx;
      font-size: $uni-font-size-lg;
      color: #000000;
      font-weight: 300;
      line-height: 50rpx;
    }
  }
}
</style>

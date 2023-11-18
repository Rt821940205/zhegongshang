<template>
  <view class="claim_list">
    <view class="result_item" v-for="(item, index) in list" :key="item.id">
      <view class="result_index">{{ index + 1 }}</view>
      <view class="result_content">
        <view class="result_row">
          <view>标题</view>
          <view>{{ item.title }}</view>
          <view @click="operateFun(index, item.id)" :class="
            operation == 'claimAll'
              ? item.isSelcet == false
                ? 'iconfont icon-fuxuankong'
                : 'iconfont icon-fuxuan'
              : ''
          ">
            {{ operation == "claimAll" ? "" : "认领" }}
          </view>
        </view>
        <view class="result_row">
          <view>类型</view>
          <view>{{ item.type }}</view>
        </view>
        <view class="result_row" v-if="item.resourceCode === 'I' || item.resourceCode === 'E'">
          <view>高被引</view>
          <view>{{ item.isHigh === 1 ? '是' : '否' }}</view>
        </view>
        <view class="result_row" v-if="item.resourceCode === 'I' || item.resourceCode === 'E'">
          <view>热点论文</view>
          <view>{{ item.isHot === 1 ? '是' : '否' }}</view>
        </view>
        <view class="result_row" v-if="item.excellence">
          <view>卓越期刊分类</view>
          <view>{{ item.excellence }}</view>
        </view>
        <view class="result_row" v-if="item.zjuttag">
          <view>工大奖励政策要求</view>
          <view>{{ item.zjuttag }}</view>
        </view>
        <view class="result_row" v-if="item.cas">
          <view>中科院分区</view>
          <view>{{ item.cas.toUpperCase() }}</view>
        </view>
        <view class="result_row" v-if="item.jcr">
          <view>JCR体系</view>
          <view>{{ item.jcr.toUpperCase() }}</view>
        </view>
        <view class="result_row" v-if="item.tag">
          <view>类别</view>
          <view>{{ item.tag === 'Z' ? '纵向项目' : item.tag === 'H' ? '横向项目' : '' }}</view>
        </view>
        <view class="result_row">
          <view>时间</view>
          <view>{{ item.year }}</view>
          <view style="bottom: 75%" @click="detailAndLooked(item, 'detail')">详情</view>
        </view>
        <view class="result_row">
          <view>作者</view>
          <view>{{ (item.resourceCode === 'J' || item.resourceCode === 'E' || item.resourceCode === 'I') ? item.creatorAll : item.creator }}</view>
          <view v-if="type == 1" @click="detailAndLooked(item, 'looked')">标为已查看</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import resultItem from "@/components/resultItem/index.vue";

export default {
  components: { resultItem },
  props: {
    achievementList: {
      type: Array,
      default: [],
    },
    type: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      operation: "",
      list: this.achievementList,
    };
  },
  watch: {
    achievementList(val) {
      // this.operation = "claimAll"
      this.list = val;
    },
  },
  methods: {
    detailAndLooked(item, type) {
      const { id, resourceCode } = item;
      switch (type) {
        case "looked":
          this.$emit("findSetResourceSearch", id);
          break;
        case "detail":
          uni.navigateTo({
            url: `/pages/compage/achment-detail?id=${id}&code=${resourceCode}`,
          });
          break;
        default:
          return;
      }
    },
    claimResult(itemid) {
      this.$emit("findAddNewResource", itemid);
    },
    operateFun(ids, itemid) {
      this.operation == "claimAll"
        ? this.claimAllClickSingle(ids)
        : this.claimResult(itemid);
    },
    handleListStatus(res) {
      if (res === "claimAll" || res === "claimCancal") {
        this.operation = res;
        this.list = this.list.map((l) => ({
          ...l,
          isSelcet: false,
        }));
      }
      if (res === "allselcet") this.allselcet();
      if (res === "claimComit") this.claimComit();
    },
    claimAllClickSingle(ids) {
      this.list[ids].isSelcet == false
        ? (this.list[ids].isSelcet = true)
        : (this.list[ids].isSelcet = false);
    },
    allselcet() {
      this.list = this.list.map((l) => ({
        ...l,
        isSelcet: true,
      }));
    },
    claimComit() {
      const resourceIdList = this.list
        .filter((l) => l.isSelcet)
        .map((f) => f.id)
        .join(",");
      if (resourceIdList.length > 0) {
        this.claimResult(resourceIdList);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.claim_list {
  .result_item {
    border: 1px $base-color solid;
    padding: $uni-spacing-row-lg;
    background: -webkit-linear-gradient(top left,
        rgba(75, 195, 226, 0.2) 0%,
        white 30%);
    background: linear-gradient(to bottom right,
        rgba(75, 195, 226, 0.2) 0%,
        white 30%);
    display: flex;
    margin-bottom: 15rpx;

    .result_index {
      width: 8%;
      font-size: $uni-font-size-base;
      color: $base-color;
    }

    .result_content {
      width: 92%;

      .result_row {
        display: flex;
        font-size: $uni-font-size-base;
        margin-bottom: 20rpx;
        position: relative;

        &:last-child {
          margin-bottom: 0;
        }

        >view:nth-child(1) {
          width: 22%;
        }

        >view:nth-child(2) {
          width: 50%;
          font-weight: bolder;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        >view:nth-child(3) {
          position: absolute;
          color: $base-color;
          right: 0;
          text-align: right;
        }
      }
    }
  }
}
</style>

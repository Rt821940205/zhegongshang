<template>
  <view class="list">
    <view v-for="(item, index) in list" :key="index" class="list-item">
      <view class="list-item__chart">
        <view>{{ item.fistPY }}</view>
        <view>({{ item.num }})</view>
      </view>
      <view
        v-for="(sItem, sIndex) in item.data"
        :key="sIndex"
        class="list-item__info"
        @click="toItem(sItem)"
      >
        <view class="top">
          <view class="left">
            <image :src="sItem.userImg" v-if="sItem.userImg" />
            <image
              src="../../static/home/default-user-header2.png"
              mode=""
              v-show="sItem.userImg === null"
            ></image>
          </view>
          <view class="right">
            <view>{{ sItem.userName }}</view>
            <view>{{ getEUserName(sItem.eUserName) }}</view>
            <view>{{ sItem.institute }} - {{ sItem.jobTitle || "暂无" }}</view>
            <view>{{ sItem.subject }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    getEUserName(value) {
      try {
        const name = JSON.parse(value)[0].name;
        return name;
      } catch (e) {
        return " 1";
      }
    },
    toItem(sItem) {
      this.$emit("update:item", sItem);
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  .list-item {
    &__chart {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 72rpx;
      text-align: right;
      color: $base-color;
      view:first-child {
        flex: 1;
        font-size: $uni-font-size-hg;
      }
      view:last-child {
        width: 50rpx;
        font-size: $uni-font-size-lg;
      }
    }
    &__info {
      background: $uni-bg-card-1;
      margin-bottom: $uni-spacing-row-base;
      .top {
        display: flex;
        padding: $uni-spacing-col-base $uni-spacing-row-base;
        .left {
          width: $uni-img-size-hg;
          image {
            height: $uni-img-size-hg;
            width: $uni-img-size-hg;
          }
        }
        .right {
          flex: 1;
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-start;
          align-items: flex-end;
          text-align: right;
          view:first-child {
            font-size: $uni-font-size-lm;
            flex: 1;
          }
          view:nth-child(2),
          view:nth-child(3),
          view:last-child {
            font-size: $uni-font-size-sm;
            flex: 1;
          }
          view:last-child {
            display: -webkit-box;
            -webkit-box-oriet: vertical;
            -webkit-line-clap: 4;
          }
        }
      }
    }
  }
}
</style>

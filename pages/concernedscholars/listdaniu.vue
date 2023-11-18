<template>
  <view class="list">
    <view v-for="(sItem, sIndex) in list" :key="sIndex" class="list-item__info">
      <view class="top">
        <view class="left">
          <button
            type="default"
            :class="{ followStyle: sItem.isfocus != '0' }"
            @click="searchDaniu(sItem.user_id, sItem)"
          >
            关注
          </button>
          <image :src="sItem.avatarPath" v-if="sItem.avatarPath" />
          <image
            v-if="!sItem.avatarPath"
            src="../../static/home/default-user-header2.png"
          />
        </view>
        <view class="right">
          <view>{{ sItem.scholar_name }}</view>
          <view
            >{{ sItem.institute }} -
            {{ sItem.professional_title || "暂无" }}</view
          >
          <view>{{ sItem.subject }}</view>
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
    searchDaniu(id, item) {
      this.$emit("update:item", id);
      item.isfocus = "1";
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  .list-item {
    &__info {
      margin-top: $uni-spacing-col-lg;
      margin-bottom: $uni-spacing-col-lg;
      background: $uni-bg-card-1;

      .top {
        height: 232rpx;
        display: flex;
        padding: $uni-spacing-col-base $uni-spacing-row-base;
        .left {
          button {
            color: white;
            background: $base-color;
            line-height: 64rpx;
            height: 64rpx;
          }
          .followStyle {
            color: black;
            background: white;
          }
          width: $uni-img-size-hg;
          font-size: 0;

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
        }
      }
    }
  }
}
</style>

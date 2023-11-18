<template>
  <view class="search_list">
    <seach-input
      v-if="achievementList.length == 0"
      :achievementList="achievementList"
      @onSearch="handleSearch"
    ></seach-input>
    <AchievementListPage
      :achievementList="achievementList"
      @findNewResourceNumByYear="findNewResourceNumByYear"
      @findAddNewResource="findAddNewResource"
    />
  </view>
</template>

<script>
import seachInput from "@/components/seachInput/index.vue";
import resultItem from "@/components/resultItem/index.vue";
import AchievementListPage from "./achievement_listPage";

export default {
  components: { seachInput, resultItem, AchievementListPage },
  props: {
    achievementList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleSearch(val) {
      this.$emit("hadleSearchName", val);
    },
  },
};
</script>

<style scoped lang="scss">
.search_list {
  .result_item {
    border: 1px $base-color solid;
    padding: 20rpx;
    background: -webkit-linear-gradient(
      top left,
      rgba(75, 195, 226, 0.2) 0%,
      white 30%
    );
    background: linear-gradient(
      to bottom right,
      rgba(75, 195, 226, 0.2) 0%,
      white 30%
    );
    display: flex;
    margin-bottom: 15rpx;
    .result_index {
      width: 5%;
      font-size: $uni-font-size-base;
      color: $base-color;
    }
    .result_content {
      width: 95%;
      .result_row {
        display: flex;
        font-size: $uni-font-size-base;
        margin-bottom: 20rpx;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        > view:nth-child(1) {
          width: 15%;
        }
        > view:nth-child(2) {
          width: 60%;
          font-weight: bolder;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > view:nth-child(3) {
          position: absolute;
          width: 25%;
          color: $base-color;
          right: 0;
          text-align: right;
        }
      }
    }
  }
}
</style>

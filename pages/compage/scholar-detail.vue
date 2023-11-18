<template>
  <view class="container">
    <view>
      <BasicInfo
        :source="source"
        :basicInfo="userInfo"
        :eUserName="eUserName"
        :researchDirection="researchDirection"
        @update:ename="eNamesChange"
        @cancelFollow="cancelFollow"
      />
      <AchievementList
        :source="source"
        :achievementList="achievementList"
        :achievementPageList="achievementPageList"
        @findUserResourcePage="findUserResourcePage"
        @sortByTime="sortByTime"
      />
    </view>
  </view>
</template>

<script>
import Api from "@/server/index.js";
import BasicInfo from "../visitingcard/basic_info.vue";
import AchievementList from "../visitingcard/achievement_list.vue";
import { dictionary } from "@/utils/dic.js";
export default {
  components: {
    BasicInfo,
    AchievementList,
  },
  props: {
    source: {
      type: Boolean,
    },
  },
  data() {
    return {
      buddyId: "",
      userInfo: {},
      baseList: [],
      loading: true,
      resourceCode: "",
      eUserName: [],
      researchDirection: [],
      achievementList: [],
      achievementPageList: [],
      orderByType: 1, //  -- 排列顺序（1-时间倒序，2-时间正序）
      needRefresh: false,
    };
  },
  onLoad({ id, buddyId }) {
    this.buddyId = buddyId;
    this.userId = id;
    this.findUserById({ id, needUserId: true });
  },
  created() {},
  methods: {
    async findUserById(params) {
      try {
        const res = await Api.getUserById(params);
        if (res.code === 1) {
          const {
            data,
            data: { eUserName, researchDirection },
          } = res;
          for (const key in data) {
            if (key === "eUserName" || key === "researchDirection") {
              data[key] = JSON.parse(data[key]);
            }
          }
          this.userInfo = data;
          this.eUserName = JSON.parse(eUserName).map((i) => i.name);
          this.researchDirection = Object.freeze(JSON.parse(researchDirection));
        }
        this.findUserResourceNum();
      } catch (e) {
        console.log(e);
      }
    },
    async findUserResourceNum() {
      try {
        const res = await Api.getUserResourceNum({
          needUserId: true,
          userId: this.userId,
        });
        if (res.code === 1) {
          const { data } = res;
          this.achievementList = data.map((a) => ({
            resourceCode: a.resourceCode,
            name: dictionary[a.resourceCode],
            badge: {
              value: a.num,
            },
          }));
          this.resourceCode = data[0].resourceCode;
          this.findUserResourcePage(data[0].resourceCode);
        }
      } catch (e) {
        console.log(e);
      }
    },
    sortByTime() {
      this.orderByType == 1 ? (this.orderByType = 2) : (this.orderByType = 1);
      this.findUserResourcePage(this.resourceCode);
    },
    async findUserResourcePage(resourceCode) {
      this.resourceCode = resourceCode;
      this.achievementPageList = [];
      try {
        const res = await Api.getUserResourcePage({
          resourceCode,
          orderByType: this.orderByType,
          pageNo: 1,
          pageSize: 100,
          needUserId: true,
          userId: this.userId,
        });
        if (res.code === 1) {
          const { data } = res;
          this.achievementPageList = Object.freeze(data);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async eNamesChange(value) {
      const eNames = this.userInfo.eUserName;
      eNames.forEach((item) =>
        item.name === value ? (item.isSelect = 1) : (item.isSelect = 0)
      );
      this.userInfo.eUserName = eNames;
      const { code } = await Api.updateUserByUserNo(this.userInfo);
      const title = code == 1 ? "修改默认英文名成功" : "修改默认英文名失败";
      uni.showToast({
        title,
        icon: "none",
      });
    },
    async cancelFollow() {
      try {
        const res = await Api.delUserBuddyPage({ buddyId: this.buddyId });
        if (res.code === 1) {
          uni.showToast({
            title: "取消成功",
            icon: "none",
          });
        }
      } catch (error) {}
    },
  },
  onPullDownRefresh() {
    this.findUserResourcePage(this.resourceCode);
    uni.stopPullDownRefresh();
  },
};
</script>

<style lang="scss" scoped>
.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}

.container {
}
</style>

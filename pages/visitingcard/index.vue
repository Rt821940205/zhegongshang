<template>
  <view class="container">
    <!-- 账号登录 -->
    <!-- <u-modal :show="show" :title="title" @confirm="confirm">
      <view>
        <u-form :model="userInfo">
          <u-form-item borderBottom>
            <u--input placeholder="请输入工号" v-model="userInfo.userNo"></u--input>
          </u-form-item>
        </u-form>
      </view>
    </u-modal> -->
    <view v-if="!show">
      <BasicInfo :basicInfo="userInfo" :eUserName="eUserName" :researchDirection="researchDirection"
        @update:ename="eNamesChange" />
      <AchievementList :achievementList="achievementList" :achievementPageList="achievementPageList"
        @findUserResourcePage="findUserResourcePage" @sortByTime="sortByTime" />
    </view>
  </view>
</template>

<script>
import Api from "@/server/index.js";
import BasicInfo from "./basic_info.vue";
import AchievementList from "./achievement_list.vue";
import { dictionary } from "@/utils/dic.js";
import strore from "@/store/index.js";
export default {
  components: {
    BasicInfo,
    AchievementList,
  },
  data() {
    return {
      baseList: [],
      loading: true,
      show: false, //soo登录
      // show: true, //账号登录
      title: "请输入工号",
      userInfo: {
        userNo: "",
      },
      resourceCode: "",
      eUserName: [],
      researchDirection: [],
      achievementList: [],
      achievementPageList: [],
      orderByType: 1, //  -- 排列顺序（1-时间倒序，2-时间正序）
      needRefresh: false,
    };
  },
  onTabItemTap(index) {
    if (this.needRefresh) {
      this.findUserResourcePage(this.resourceCode);
    } else {
      this.needRefresh = true;
    }
  },
  onHide() {
    this.needRefresh = true;
  },
  mounted() {
    //弹出框本地测试
    const userNo = strore.state.home.userNo;
    if (!!userNo) {
      this.findUserByUserNo({ userNo });
    } else {
      this.show = true;
    }
  },
  created() { },
  //sso登录模式
  async onLoad() {
    uni.$on("update", () => {
      const userNo = this.$store.state.home.userNo;
      if (!!userNo) {
        this.findUserByUserNo({ userNo });
      } else {
        this.show = true;
      }
    });
  },
  methods: {
    confirm() {
      this.show = false;
      this.findUserByUserNo(this.userInfo);
      this.$store.dispatch("setUserNo", this.userInfo.userNo);
    },
    click(name) {
      this.$refs.uToast.success(name);
      uni.navigateTo({
        url: `/pages/functionintroduction/details/index?id=${name}`,
      });
    },
    async findUserByUserNo(params) {
      try {
        const res = await Api.getUserByUserNo(params);
        if (res.code === 1) {
          const {
            data,
            data: { eUserName, researchDirection, id },
          } = res;
          for (const key in data) {
            if (key === "eUserName" || key === "researchDirection") {
              data[key] = JSON.parse(data[key]);
            }
          }
          this.userInfo = data;
          this.eUserName = JSON.parse(eUserName).map((i) => i.name);
          this.researchDirection = Object.freeze(JSON.parse(researchDirection));
          uni.setStorageSync("userId", id);
          uni.setStorageSync("userNo", params.userNo);
          this.$store.dispatch("setUser", data);
          this.$store.dispatch("setUserId", id);
          this.findUserResourceNum(id);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async findUserResourceNum(id) {
      try {
        const res = await Api.getUserResourceNum({ userId: id });
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
</style>

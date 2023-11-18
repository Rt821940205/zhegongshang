<template>
  <view class="extraInfo">
    <view class="title">* 请补充过往履历及曾用邮箱,以便发现您的更多成果。</view>
    <view v-for="(item, idx) in list" :key="idx">
      <view class="closeBox">
        <u-icon name="close" size="18" color="#316B7A" @click="remove(item)" />
      </view>
      <view class="extraInfo-item">
        <view>时间</view>
        <view>{{ item.yearFrom }} - {{ item.yearTo }}</view>
      </view>
      <view class="extraInfo-item">
        <view>机构</view>
        <view>{{ item.agency }}</view>
      </view>
      <view class="extraInfo-item">
        <view>学历</view>
        <view>{{ item.education }}</view>
      </view>
      <view class="extraInfo-item">
        <view>邮箱</view>
        <view>{{ item.email }}</view>
      </view>
    </view>

    <view v-if="!isShowCard">
      <view class="closeBox">
        <u-icon name="close" size="18" color="#316B7A" @click="remove" />
      </view>

      <u--form :model="form" :rules="rules" ref="form1" :borderBottom="false">
        <u-form-item label="时间" prop="yearTimes">
          <view class="form-item">
            <picker
              :value="form.yearFrom"
              :range="years"
              @change="yearFromChange"
            >
              <view>
                {{ years[form.yearFrom] }}
              </view>
            </picker>
            <view class="split"> - </view>
            <picker
              :value="form.yearTo"
              :range="[...years.slice(0, 1), '至今', ...years.slice(1)]"
              @change="yearToChange"
            >
              <view>
                {{
                  [...years.slice(0, 1), "至今", ...years.slice(1)][form.yearTo]
                }}
              </view>
            </picker>
          </view>
        </u-form-item>
        <u-form-item label="机构" prop="agency">
          <view class="form-item">
            <u--input
              v-model="form.agency"
              placeholder="请输一级机构"
              class="search-input"
              clearable
            />
          </view>
        </u-form-item>
        <u-form-item label="学历" prop="education">
          <view class="form-item">
            <picker
              :value="form.education"
              :range="leavels"
              @change="educationChange"
            >
              <view>
                {{ leavels[form.education] }}
              </view>
            </picker>
          </view>
        </u-form-item>
        <u-form-item label="邮箱" prop="email">
          <view class="form-item">
            <u--input
              v-model="form.email"
              placeholder="请输入邮箱"
              class="search-input"
              clearable
            />
          </view>
        </u-form-item>
      </u--form>
    </view>

    <view class="bottom">
      <u-icon
        v-if="isShowCard"
        name="plus"
        size="18"
        color="#316B7A"
        @click="add"
      />
      <view v-else @click.stop="save"> 确定 </view>
    </view>
  </view>
</template>
<script>
import Api from "@/server/index.js";
import { checkEmail } from "@/utils/common.js";
export default {
  data() {
    let years = ["请选择年份"];
    let currYear = new Date().getFullYear();
    while (currYear >= 1981) {
      years.push(currYear);
      currYear--;
    }
    return {
      isShowCard: true,
      years,
      index: 0,
      leavels: ["选择", "本科", "硕士", "博士"],
      form: {
        yearFrom: 0,
        yearTo: 0,
        agency: "",
        education: 0,
        email: "",
        yearTimes: [0, 0],
      },
      list: [],
      kid: "",
      rules: {
        yearTimes: [
          {
            // required: true,
            message: "请选择起始时间", // 自定义验证函数，见上说明
            validator: (rule, value, callback) => !value[0] == 0,
            trigger: ["change", "blur"],
          },
          {
            // required: true,
            message: "请选择结束时间", // 自定义验证函数，见上说明
            validator: (rule, value, callback) => !value[1] == 0,
            trigger: ["change", "blur"],
          },
        ],
        // yearTo: { required: true, message: "请选择时间" },
        agency: {
          required: true,
          message: "请输入机构",
          trigger: ["change", "blur"],
        },
        education: {
          required: true,
          message: "请选择学历",
          validator: (rule, value, callback) => !value == 0,
          trigger: ["change", "blur"],
        },
        email: {
          validator: (rule, value, callback) => checkEmail(value),
          message: "请输入正确的邮箱格式",
          // 触发器可以同时用blur和change
          trigger: ["change", "blur"],
        },
      },
    };
  },
  watch: {
    isShowCard: {
      handler(newVal) {
        if (newVal) {
          this.reset();
        }
      },
      immediate: true,
    },
  },
  async mounted() {
    this.kid = this.$store.state.home.userNo;
    await this.init();
  },

  methods: {
    async init() {
      const params = { kid: this.kid };
      const { data } = await Api.getScholarResume(params);
      this.list = data;
    },
    add() {
      this.isShowCard = !this.isShowCard;
    },
    yearFromChange(e) {
      this.form.yearFrom = e.target.value;
      this.form.yearTimes[0] = e.target.value;
      this.$refs.form1.validateField('yearTimes');
    },
    yearToChange(e) {
      this.form.yearTo = e.target.value;
      this.form.yearTimes[1] = e.target.value;
      this.$refs.form1.validateField('yearTimes');
    },
    educationChange(e) {
      this.form.education = e.target.value;
      this.$refs.form1.validateField('education');
    },
    reset() {
      this.form = {
        yearFrom: 0,
        yearTo: 0,
        agency: "",
        education: 0,
        email: "",
        yearTimes: [0, 0],
      };
    },
    async save() {
      try {
        await this.$refs.form1.validate();
        const _form = JSON.parse(JSON.stringify(this.form));
        _form.yearFrom = this.years[this.form.yearFrom];
        _form.yearTo = [
          ...this.years.slice(0, 1),
          "至今",
          ...this.years.slice(1),
        ][this.form.yearTo];
        _form.education = this.leavels[this.form.education];
        _form.kid = this.kid;
        const { code } = await Api.addScholarResume(_form);
        if (code == 1) {
          await this.init();
          this.isShowCard = true;
          uni.showToast({
            title: "保存成功",
            icon: "none",
          });
        } else {
          uni.showToast({
            title: "保存失败",
            icon: "none",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async remove(item) {
      if (!item) {
        this.isShowCard = true;
      } else {
        const { id } = item;
        const ret = await Api.delScholarResume({ id });
        if (ret) {
          const currIndex = this.list.findIndex((sItem) => sItem.id === id);
          this.list.splice(currIndex, 1);
          uni.showToast({
            title: "删除成功",
            icon: "none",
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.extraInfo {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 36rpx;
  padding: 22rpx 8rpx 22rpx 8rpx;

  .extraInfo-item {
    display: flex;
    justify-content: space-between;
    font-size: $uni-font-size-base;
    margin-bottom: $uni-spacing-col-lm;
  }

  .bottom,
  .closeBox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: $uni-spacing-col-lm;
  }

  .search-input {
    border-bottom: 2rpx solid $base-color;
    border-radius: 0;
  }

  .title {
    color: $base-color;
    font-size: $uni-font-size-base;
    margin-bottom: 24rpx;
  }

  .form-item {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: $uni-font-size-base;
  }
}
</style>

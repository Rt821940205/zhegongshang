<template>
  <view class="app">
    <view class="header">
      <tNav :title="title" />
    </view>
    <view class="content">
      <view class="content__view">
        <view>已选择：</view>
        <view>
          <u-tag
            v-for="item in selectTags"
            :key="item"
            :text="item"
            style="display: inline-flex"
            plain
            size="mini"
            closable
            border-color="#557ff7"
            color="#557ff7"
            @close="removeTag(item)"
          />
        </view>
        <view>
          <view>
            <image src="@/static/home/search@2x.png" />
          </view>
          <view class="search">
            <u--input
              class="search-input"
              placeholder="请输入内容"
              v-model="search"
              @input="handlerInput"
              border="bottom"
              clearable
            ></u--input>
          </view>
        </view>
        <view>
          <u-tag
            v-for="item in searchTags"
            :key="item"
            :text="item"
            :color="selectInSearchTag(item) ? 'white' : '#557ff7'"
            :background="selectInSearchTag(item) ? '#557ff7' : ''"
          />
        </view>
        <view @click.stop="save"> 确定 </view>
      </view>
    </view>
  </view>
</template>
<script>
import Api from "@/server/index.js";
import { mapState, mapGetters } from "vuex";
export default {
  onLoad: function (option) {
    console.log(option)
    this.tagsName = option.tagsName || "researchDirection";
    this.title = option.title || "补充信息 - 研究方向";
    // console.log(this.tagsName,this.title)
  },
  data() {
    return {
      selectTags: [],
      search: "",
      searchTags: [],
      tagsName: "",
      title: "",
    };
  },
  computed: {
    ...mapState({
      form: (state) => state.home.user,
    }),
    // ...mapGetters({
    //   // tags: "researchDirectionCount",
    //   tags:this.tagsName,
    // }),
    tags() {
      return this.$store.getters[this.tagsName + "Count"];
    },
  },
  watch: {
    tags: {
      handler(newVal) {
        this.selectTags = newVal;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    async handlerInput(text) {
      if (this.tagsName == "subject") return;
      this.searchTags = [];
      if (!text) return;
      const { data } = await Api.getResearchDirection({ text });
      this.searchTags = data && data.map((item) => item.text);
    },
    selectInSearchTag(item) {
      return this.selectTags.includes(item);
    },
    async save() {
      if (this.search === "") {
        return uni.showToast({
          title: "请输入搜索内容",
          icon: "none",
        });
      }
      if (this.selectTags.length === 0) {
        return uni.showToast({
          title: "请至少选择一个方向",
          icon: "none",
        });
      }
      if (this.searchTags.length === 0 && this.search !== "") {
        if (!this.selectTags.includes(this.search)) {
          this.selectTags.push(this.search);
        }
      }

      if (this.tagsName === "subject") {
        this.form[this.tagsName] = this.selectTags.join(";");
      } else {
        this.form[this.tagsName] = this.selectTags;
      }

      // this.form.researchDirection = this.selectTags;

      const { code } = await Api.updateUserByUserNo(this.form);
      if (code == 1) {
        uni.$emit("update");
        uni.showToast({
          title: "保存成功",
          icon: "none",
        });
        this.search = "";
        this.searchTags = [];
      }
    },
    async removeTag(item) {
      const index = this.selectTags.findIndex((sItem) => sItem === item);
      this.selectTags.splice(index, 1);

      // this.form.researchDirection = this.selectTags;

      if (this.tagsName === "subject") {
        this.form[this.tagsName] = this.selectTags.join(";");
      } else {
        this.form[this.tagsName] = this.selectTags;
      }

      const { code } = await Api.updateUserByUserNo(this.form);
      if (code == 1) {
        uni.$emit("update");
        uni.showToast({
          title: "删除成功",
          icon: "none",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  .header {
    height: 64rpx;
    padding: $zgd-arrow-padding;
  }
  .content {
    padding: 0 50rpx 0 50rpx;
    margin-top: 22rpx;
    &__view {
      border: 1px solid $base-border-color;
      padding: 22rpx 24rpx 22rpx 24rpx;
      // background: $base-background-color;
      > view:first-child {
        color: $base-color;
        font-size: $uni-font-size-base;
        margin-bottom: 24rpx;
      }
      > view:nth-child(2) {
        border-bottom: 1px solid $base-border-color;
        padding-bottom: 18rpx;
      }
      > view:nth-child(3) {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30rpx;
        > view:first-child {
          font-size: 0;
          image {
            width: 40rpx;
            height: 40rpx;
          }
        }
        > view:last-child {
          width: 100%;
          margin-left: 20rpx;
        }
      }
      > view:nth-child(4) {
        margin-top: 20rpx;
      }
      > view:last-child {
        text-align: right;
        color: $base-color;
        font-size: $uni-font-size-base;
      }
    }
    .search-input {
      border-bottom: 1px solid $base-color;
      border-radius: 0;
    }
  }
}
</style>

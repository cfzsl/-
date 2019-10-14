<template>
  <!-- 绩效考核 -->
  <div>
    <van-nav-bar
      class="navbar"
      :title="this.$route.name"
      fixed
      right-text="更多"
      left-arrow
      @click-left="back"
      @click-right="show"
    />
    <transition name="slide-fade">
      <div class="menu" v-show="toget" @click="show">
        <router-link to="/ToiletManagement/ToiletFile">公厕档案</router-link>
        <router-link to="/ToiletManagement/">公厕分布</router-link>
        <router-link to="/ToiletManagement/Appraisal">绩效考核</router-link>
        <router-link to="/ToiletManagement/PerformanceStatistics">绩效统计</router-link>
        <router-link to="/ToiletManagement/Rules">绩效规则</router-link>
        <router-link to="/ToiletManagement/CommentReview">评论审核</router-link>
        <router-link to="/ToiletManagement/CommentList">评论查看</router-link>
      </div>
    </transition>
    <DropdownMenu :status="status"></DropdownMenu>

    <div class="itembox">
      <div class="month">
        <dataPicker class="picker"></dataPicker>
      </div>

      <van-row class="item">
        <van-col span="12">管养单位</van-col>
        <van-col span="6">报警次数</van-col>
        <van-col span="6">平均得分</van-col>
      </van-row>
    </div>

    <van-pull-refresh class="appbox" v-model="isLoading" @refresh="onRefresh">
      <van-row
        class="list"
        type="flex"
        justify="space-around"
        v-for="item in assessList"
        :key="item.sid"
        align="center"
      >
        <van-col span="12">{{ item.departname }}</van-col>
        <van-col span="6">{{ item.countnh3m + item.countnh3w + item.counth2sm + item.counth2sw }}</van-col>
        <van-col span="6">{{ item.scoreavg }}</van-col>
      </van-row>
    </van-pull-refresh>
  </div>
</template>

<script>
import dataPicker from "../../dateTimePicker.vue";
import DropdownMenu from "../../DropdownMenu.vue";
export default {
  components: {
    dataPicker,
    DropdownMenu
  },
  data() {
    return {
      date: false,

      currentDate: new Date(),
      status: [
        { text: "全报警次数", value: 0 },
        { text: "0次", value: 1 },
        { text: "1次", value: 2 },
        { text: "2次", value: 3 },
        { text: "3次", value: 4 },
        { text: "4次", value: 5 },
        { text: "5次", value: 6 }
      ],
      assessList: null,
      isLoading: false,
      toget: false
    };
  },
  methods: {
    show() {
      this.toget = !this.toget;
    },
    back() {
      this.$router.go(-1);
      this.show();
    },
    onRefresh() {
      setTimeout(() => {
        this.getAssessList();
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    showPicker() {
      this.date = !this.date;
    },
    selectDate(value) {
      console.log(value);
    },
    getAssessList() {
      this.$http.get("appraisal/search?tip_depart&tip_month=8").then(res => {
        console.log(res);
        this.assessList = res;
      });
    }
  },
  created() {
    this.getAssessList();
  }
};
</script>

<style scoped>
.item {
  font-size: 15px;
  background-color: #c2fbff;
  line-height: 30px;
}
.itembox {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 9;
}
.appbox {
  margin-top: 65px;
}

.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #e6e6e6;
}

.text {
  font-size: 12px;
}

.picker {
  line-height: 10px;
}

.list {
  height: 35px !important;
  overflow: hidden;
  font-size: 12px;
  margin: 5px 0;
  border-bottom: 1px solid #000;
}
.menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  top: 46px;
  z-index: 10;
  background-color: #fff;
}
.menu a {
  display: block;
  width: 93px;
  font-size: 12px;
  padding: 5px 0 10px 0;
  color: #000;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
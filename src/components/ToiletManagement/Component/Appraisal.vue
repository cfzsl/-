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
    <!-- <DropdownMenu :status="status"></DropdownMenu> -->

    <div class="itembox">
      <!-- <van-dropdown-menu>
        <van-dropdown-item v-model="option.toile" :options="toile" @change="toChange" />
        <van-dropdown-item v-model="option.company" :options="company" @change="toChange" />
        <van-dropdown-item v-model="option.num" :options="num" @change="toChange" />
      </van-dropdown-menu> -->

      <div class="month">
        <van-button type="primary" size="mini" @click="showPicker" class="datePickerBtn">
          本月
          <van-icon class="icon" name="arrow-down" />
        </van-button>

        <div class="text">共{{ assessList.length }}条数据</div>
      </div>

      <van-row class="item" type="flex" justify="space-around">
        <van-col span="6">公厕名称</van-col>
        <van-col span="7">管养单位</van-col>
        <van-col span="4">报警次数</van-col>
        <van-col span="4">平均得分</van-col>
        <van-col span="1"></van-col>
      </van-row>
    </div>

    <van-pull-refresh class="appbox" v-model="isLoading" @refresh="onRefresh">
      <div>
        <van-row
          class="list"
          type="flex"
          justify="space-around"
          v-for="item in assessList"
          :key="item.sid"
          align="center"
          @click="go(item)"
        >
          <van-col span="6">{{ item.name }}</van-col>
          <van-col span="7">{{ item.depart }}</van-col>
          <van-col span="4">{{ item.totalWarningCount }}</van-col>
          <van-col span="4">{{ item.score }}</van-col>
          <van-col span="1">
            <van-icon name="arrow" />
          </van-col>
        </van-row>
      </div>
    </van-pull-refresh>

    <van-datetime-picker
      class="datepicker"
      v-show="date"
      v-model="currentDate"
      type="year-month"
      :formatter="formatter"
      @confirm="selectDate"
      @cancel="showPicker"
    />
    <van-overlay z-index="99" :show="date" @click="date = false" />
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
      assessList: [],
      isLoading: false,
      toget: false,
      toile: [{ text: "全部公厕", value: "" }],
      company: [{ text: "全部管养单位", value: "" }],
      num: [
        { text: "全报警次数", value: "" },
        { text: "0次", value: "0" },
        { text: "1次", value: "1" },
        { text: "2次", value: "2" },
        { text: "3次", value: "3" },
        { text: "4次", value: "4" },
        { text: "5次", value: "5" }
      ],
      option: {
        toile: "",
        company: "",
        num: ""
      }
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
    selectDate(value) {},
    getAssessList() {
      this.$http
        .post("detailCurrent/appraisalConditionQuery")
        .then(res => {
          console.log(res);
          this.assessList = res.data;
          for (const key in res) {
            this.toile.push({ text: res[key].wcname, value: res[key].wcname });
            this.company.push({
              text: res[key].depart,
              value: res[key].depart
            });
          }
          this.company = this.filter(this.company);
          // console.log(this.company);
        });
    },
    filter(obj) {
      const res = new Map();
      return obj.filter(a => !res.has(a.value) && res.set(a.value, a.value));
    },
    go(item) {
      localStorage.setItem("item", JSON.stringify(item));
      this.$router.push({
        name: "公厕绩效"
      });
    },
    toChange(v) {
      this.$http
        .post("detailCurrent/listAllApp", this.$qs.stringify(this.option))
        .then(res => {
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
  height: 50px;
  background-color: #cae4fc;
  line-height: 50px;
}
.itembox {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 9;
}
.appbox {
  /* margin-top: 185px; */
  margin-top: 135px;
}

.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #e6e6e6;
}

.datepicker {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
.datePickerBtn {
  border-radius: 10px;
  background-color: #fff;
  color: #000;
  border: 0;
  margin-left: 10px;
}
.icon {
  margin-top: 5px;
}

.text {
  font-size: 12px;
  margin-right: 10px;
}

.picker {
  overflow: hidden;
  line-height: 10px;
}

.list {
  height: 50px !important;
  overflow: hidden;
  padding: 5px 0;
  border-bottom: 1px solid #d2d2d2;
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
  height: 30px;
  line-height: 30px;
  font-size: 15px;
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
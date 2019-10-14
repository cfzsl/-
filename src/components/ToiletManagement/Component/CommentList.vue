<template>
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

    <div class="itembox">
      <div class="month">
        <van-button type="primary" size="mini" @click="showPicker" class="datePickerBtn">本月</van-button>

        <div class="text">共{{ this.CommentList.length }}条数据</div>
      </div>

      <van-row class="titleitem">
        <van-col span="3">序号</van-col>
        <van-col span="8">公厕名称</van-col>
        <van-col span="13">评论人</van-col>
      </van-row>
    </div>

    <van-pull-refresh class="listbox" v-model="isLoading" @refresh="onRefresh">
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item class="item" v-for="item in this.CommentList" :key="item.sid">
          <div slot="title">
            <van-row>
              <van-col span="6">{{ item.sid }}</van-col>
              <van-col span="10">{{ item.wcname }}</van-col>
              <van-col span="8">{{ item.userid }}</van-col>
            </van-row>
          </div>
          <div class="content">
            <div>评论时间: {{ item.createtime }}</div>
            <div>评论内容: {{ item.content}}</div>
          </div>
        </van-collapse-item>
      </van-collapse>
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

    <van-overlay :show="date" @click="date = false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      CommentList: [],
      date: false,
      currentDate: null,
      activeNames: [],
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
        this.getList();
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    showPicker() {
      this.date = !this.date;
    },
    getList() {
      this.$http.get("comment/showComment").then(res => {
        this.CommentList = res.data;
      });
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
      this.showPicker();
    }
  },
  created() {
    this.getList();
  },
  // 时间格式处理
  filters: {
    formatDate(time) {
      let date = new Date(time); //Mon Jan 19 1970 01:28:27 GMT+0800 (中国标准时间)
      let year = date.getFullYear();
      let month = date.getMonth();
      month = month + 1 > 10 ? month : "0" + month;
      let day = date.getDate();
      day = day + 1 > 10 ? day : "0" + day;
      let hour = date.getHours();
      hour = hour + 1 > 10 ? hour : "0" + hour;
      let minte = date.getMinutes();
      minte = minte + 1 > 10 ? minte : "0" + minte;
      let second = date.getSeconds();
      second = second + 1 > 10 ? second : "0" + second;

      return (
        year +
        "-" +
        month +
        "-" +
        day +
        "   " +
        hour +
        ":" +
        minte +
        ":" +
        second
      );
    }
  }
};
</script>

<style scoped>
.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #e6e6e6;
}
.itembox {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 9;
}
.listbox {
  margin-top: 115px;
}
.titleitem {
  font-size: 15px;
  background-color: #c2fbff;
  line-height: 30px;
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
.text {
  font-size: 12px;
  padding-right: 15px;
}
.item {
  border-bottom: 1px solid #ccc !important;
  text-align: left;
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
<template>
  <div>
    <div class="month">
      <van-button type="primary" size="mini" @click="showPicker" class="datePickerBtn">本月</van-button>

      <div class="text">共{{ this.logList.length }}条数据</div>
    </div>

    <van-pull-refresh class="logbox" v-model="isLoading" @refresh="onRefresh">
      <van-row
        class="list"
        type="flex"
        justify="space-around"
        v-for="item in logList"
        :key="item.id"
        align="center"
      >
        <van-col span="12">{{ item.operatetime | formatDate }}</van-col>
        <van-col span="16">{{ item.operateperson }}</van-col>
        <van-col span="8">{{ item.operatedetail }}</van-col>
      </van-row>
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
export default {
  data() {
    return {
      logList: [],
      date: false,
      currentDate: null,
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.getOperationLog();
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    showPicker() {
      this.date = !this.date;
    },
    getOperationLog() {
      this.$http.get("operateLog/post/all").then(res => {
        this.logList = res;
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
      this.showPicker();
    }
  },
  created() {
    this.getOperationLog();
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
  position: fixed;
  top: 46px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #e6e6e6;
  z-index: 9;
}

.logbox {
  margin-top: 86px;
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
}

.list {
  height: 35px !important;
  overflow: hidden;
  font-size: 12px;
  margin: 5px 0;
  border-bottom: 1px solid #000;
}
</style>
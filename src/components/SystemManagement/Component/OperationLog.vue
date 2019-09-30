<template>
  <div>
    <div class="month">
      <van-button type="primary" size="mini" @click="showPicker" class="datePickerBtn">本月</van-button>

      <div class="text">共X条数据</div>
    </div>

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      logList: null
    };
  },
  methods: {
    showPicker() {
      this.date = !this.date;
    },
    getOperationLog() {
      this.$http.get("operateLog/post/all").then(res => {
        console.log(res);
        this.logList = res;
      });
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #ccc;
  margin-bottom: 10px;
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
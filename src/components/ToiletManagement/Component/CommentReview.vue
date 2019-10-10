<template>
  <div class="box">
    <div class="month">
      <van-button type="primary" size="mini" @click="showPicker" class="datePickerBtn">本月</van-button>

      <div class="text">共{{ this.reviewList.length }}条数据</div>
    </div>

    <van-row class="titleitem">
      <van-col span="3">序号</van-col>
      <van-col span="9">公厕名称</van-col>
      <van-col span="12">评论人</van-col>
    </van-row>

    <van-collapse v-model="activeNames" :border="false">
      <van-collapse-item class="item" v-for="item in reviewList" :key="item.sid">
        <div slot="title">
          <van-row>
            <van-col span="6">{{ item.sid }}</van-col>
            <van-col span="12">{{ item.wcname}}</van-col>
            <van-col span="6">{{ item.userid}}</van-col>
          </van-row>
        </div>
        <div class="content">
          <div>评论时间: {{ item.createtime }}</div>
          <div>评论内容: {{ item.content }}</div>
        </div>
        <div v-if="item.status" class="pass">已通过</div>
        <div v-else>
          <div class="edit" @click="pass(item.sid)">通过</div>
          <div class="detele">不通过</div>
        </div>
      </van-collapse-item>
    </van-collapse>

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
      reviewList: [],
      date: false,
      currentDate: null,
      activeNames: []
    };
  },
  methods: {
    showPicker() {
      this.date = !this.date;
    },
    getReview() {
      this.$http.get("wcAndroid/findAllCommentAndroid").then(res => {
        this.reviewList = res.data;
        for (const key in this.reviewList) {
          this.reviewList[key].status = parseInt(this.reviewList[key].status);
        }
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
    },
    pass(sid) {
      this.$http
        .post("commentStatus/updateStatus", this.$qs.stringify({ sid }))
        .then(res => {
          this.getReview();
        });
    }
  },
  created() {
    this.getReview();
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
.box {
  margin-bottom: 50px;
}

.titleitem {
  font-size: 15px;
  background-color: #e7e7e7;
  line-height: 30px;
}

.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #ccc;
  margin-bottom: 10px;
}

.datepicker {
  width: 100%;
  position: fixed;
  bottom: 50px;
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
.item {
  border-bottom: 1px solid #ccc !important;
  text-align: left;
}

.edit,
.detele {
  text-align: center;
  width: 90px;
  display: inline-block;
  margin: 0 30px;
  border: 1px solid #ccc;
  border-radius: 7px;
  color: #fff;
}

.edit {
  background-color: #66cc99;
}
.detele {
  background-color: #ccc;
}
.pass {
  text-align: center;
  color: green;
}
</style>
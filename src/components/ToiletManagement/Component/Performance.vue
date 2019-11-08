<template>
  <div>
    <van-nav-bar left-arrow @click-left="onClickLeft" fixed :title="msg.name">
      <div class="month" slot="right">
        <van-button type="primary" size="mini" @click="showPicker" class="datePickerBtn">
          本月
          <van-icon class="icon" name="arrow-down" />
        </van-button>
      </div>
    </van-nav-bar>
    <div class="navbar">
      <div class="headerbox">
        <div>公厕监测数据汇总表</div>
        <div>
          男厕报警次数:
          <span class="blue">{{ this.rulesdata.countm }}次</span>
          女厕报警次数:
          <span class="blue">{{ this.rulesdata.countw }}次</span>
        </div>
        <div>
          男厕绩效：
          <span>{{ this.rulesdata.jixiaoman }}</span>
          女厕绩效：
          <span>{{ this.rulesdata.jixiaowoman }}</span>
        </div>
        <div>最后得分： {{ this.msg.score }}</div>
      </div>
      <van-row class="contentnav">
        <van-col span="6">时间</van-col>
        <van-col span="9">男/女厕氨气</van-col>
        <van-col span="8">男/女厕硫化氢</van-col>
        <van-col span="1"></van-col>
      </van-row>
    </div>

    <div class="contentbox">
      <van-row class="contentitem" v-for="item in list" :key="item.id" @click="go(item)">
        <van-col span="6">{{ item.time }}</van-col>
        <van-col span="9">
          <span v-if="item.mannh4 < rules.maxnh4mvalue" class="green">{{ item.mannh4 }}</span>
          <span v-else class="red">{{ item.mannh4 }}</span>
          /
          <span v-if="item.ladynh4 < rules.maxnh4wvalue" class="green">{{ item.ladynh4 }}</span>
          <span v-else class="red">{{ item.ladynh4 }}</span>
          PM
        </van-col>
        <van-col span="8">
          <span v-if="item.manh2s < rules.maxh2smvalue" class="green">{{ item.manh2s }}</span>
          <span v-else class="red">{{ item.manh2s }}</span>
          /
          <span v-if="item.ladyh2s < rules.maxh2swvalue" class="green">{{ item.ladyh2s }}</span>
          <span v-else class="red">{{ item.ladyh2s }}</span>
          PM
        </van-col>
        <van-col span="1">
          <van-icon name="arrow" />
        </van-col>
      </van-row>
    </div>

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
      date: false,
      currentDate: new Date(),
      time: 11,
      msg: {},
      list: {},
      rules: {},
      rulesdata: {}
    };
  },
  methods: {
    onClickLeft() {
      // localStorage.setItem("item", "");
      this.$router.go(-1);
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
    go(item) {
      localStorage.setItem("detail", JSON.stringify(item));
      this.$router.push({
        name: "绩效详情",
        params: {
          sid: this.msg.sid
        }
      });
    },
    getList() {
      this.$http
        .post(
          "detail/showWcDetail",
          this.$qs.stringify({
            wcName: this.msg.name,
            month: 10
          })
        )
        .then(res => {
          console.log(res);
          this.list = res.data;
        });
    },
    getRule() {
      this.$http.post("warningRules/list").then(res => {
        // console.log(res);
        this.rules = res;
      });
    },
    getData() {
      this.$http
        .post(
          "appraisal/showOneWcAppraisal",
          this.$qs.stringify({
            wcName: this.msg.name,
            month: 9
          })
        )
        .then(res => {
          // console.log(res);
          this.rulesdata = res.data[0];
        });
    }
  },
  created() {
    this.msg = JSON.parse(localStorage.getItem("item"));
    // console.log(this.msg);
    this.getData();
    this.getList();
    this.getRule();
  }
};
</script>

<style scoped>
.datepicker {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
.datePickerBtn {
  border-radius: 10px;
  background-color: #e6e6e6;
  color: #000;
  border: 0;
  margin-left: 10px;
}
.headerbox {
  text-align-last: left;
  padding-left: 10px;
  background-color: #fff;
}
.headerbox div {
  height: 30px;
  line-height: 30px;
}
.blue {
  border: 1px solid #87baff;
  border-radius: 4px;
  color: #87baff;
  margin: 0 10px 0 5px;
  padding: 2px 5px;
}

.navbar {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 9;
}

.contentbox {
  margin-top: 215px;
}
.contentnav {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #cae4fc;
}
.contentitem {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #d2d2d2;
}

.green {
  color: green;
}
.red {
  color: red;
}
</style>
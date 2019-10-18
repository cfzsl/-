<template>
  <div class="father">
    <van-nav-bar title="绩效详情" left-arrow @click-left="onClickLeft" @click-right="goAppeal">
      <div style="color: #3082ff" slot="right">申诉</div>
    </van-nav-bar>

    <div class="contentbox">
      <div>
        公厕名成：
        <span>{{ this.msg.name }}</span>
      </div>
      <div>
        地址：
        <span>{{ this.msg.addressmemo }}</span>
      </div>
      <div>
        当前状态：
        <span v-if="this.msg.status === '开放使用'" class="green">开放使用</span>
        <span v-else-if="this.msg.status === '暂停使用'" class="grey">暂停使用</span>
        <span v-else-if="this.msg.status === '即将启用'" class="red">即将启用</span>
      </div>
      <div>
        服务：
        <span>{{ this.msg.servicename }}</span>
      </div>
      <div>
        管养单位：
        <span>{{ this.msg.depart }}</span>
      </div>
      <div>
        负责人联系方式：
        <span>{{ this.msg.chargetel }}</span>
      </div>
    </div>

    <van-tabs
      class="tabs"
      type="card"
      line-width="50%"
      background="#f1f1f1"
      color="#3082ff"
      title-active-color="#000"
    >
      <van-tab title="男厕" class="tabcontent">
        <van-row>
          <van-col span="12">
            温度：
            <span>{{ this.data.mantemperature}}</span>℃
          </van-col>
          <van-col span="12">
            湿度：
            <span>{{ this.data.mandampness }}</span>%
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            氨气：
            <span>{{ this.data.mannh4 }}</span>PPM
          </van-col>
          <van-col span="12">
            硫化氢：
            <span>{{ this.data.manh2s }}</span>PPM
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="女厕" class="tabcontent">
        <van-row>
          <van-col span="12">
            温度：
            <span>{{ this.data.mantemperature }}</span>℃
          </van-col>
          <van-col span="12">
            湿度：
            <span>{{ this.data.ladaydampness }}</span>%
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            氨气：
            <span>{{ this.data.ladynh4 }}</span>PPM
          </van-col>
          <van-col span="12">
            硫化氢：
            <span>{{ this.data.ladyh2s }}</span>PPM
          </van-col>
        </van-row>
      </van-tab>
    </van-tabs>

    <div class="footer">
      <div>城市公厕卫生标准指（一类）</div>
      <div>
        <van-row>
          <van-col span="12">温度：不低于14℃</van-col>
          <van-col span="12">湿度：不高于80%</van-col>
        </van-row>
      </div>
      <div>
        <van-row>
          <van-col span="12">氨气： 0.3PPM</van-col>
          <van-col span="12">硫化氢： 0.01PPM</van-col>
        </van-row>
      </div>
      <div>最后接收数据时间：{{ this.data.time }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: {},
      data: {}
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goAppeal() {
      this.$router.push({
        name: "报警申诉",
        params: {}
      });
    },
    getToileMsg() {
      let sid = JSON.parse(localStorage.getItem("item")).sid;
      this.data = JSON.parse(localStorage.getItem("detail"));
      console.log(this.data);
      
      this.$http.post("wc/findOne", this.$qs.stringify({ sid })).then(res => {
        this.msg = res.data;
      });
    }
  },
  created() {
    this.getToileMsg();
  }
};
</script>

<style scoped>
.father {
  font-size: 15px;
}
.contentbox {
  text-align-last: left;
  padding-left: 10px;
  margin-top: 15px;
}
.contentbox div {
  height: 30px;
  line-height: 30px;
  font-weight: 700;
}
.contentbox span {
  font-weight: 400;
}

.tabs {
  padding: 0;
  margin: 10px 5px;
  padding-top: 5px;
  text-align: left;
  border: 1px solid #d2d2d2;
}
.tabcontent div {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}

.footer {
  text-align: left;
  padding-left: 10px;
}

.footer div {
  height: 30px;
  line-height: 30px;
}

.green {
  color: green;
}
.grey {
  color: grey;
}
.red {
  color: red;
}
</style>
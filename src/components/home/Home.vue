<template>
  <!-- 首页 -->
  <div class="homepage">
    <Header></Header>

    <van-row class="product" type="flex" justify="space-around">
      <van-col span="12" class="item" style="margin: 4px 0 2px" @click="routerPushList">
        <p>东营区公共厕所（个)</p>
        <div class="num" style="color: #35C36E">{{ this.total }}</div>
      </van-col>
      <van-col span="12" class="item" style="margin: 4px 0 2px" @click="routerPush">
        <p>东营区管养单位总数（个)</p>
        <div class="num" style="color: #FFA941">{{ this.Custody }}</div>
      </van-col>
    </van-row>
    <van-row class="product" type="flex" justify="space-around">
      <van-col span="12" class="item" style="margin: 2px 0 4px" @click="goList('男')">
        <p>东营区男公厕报警数（个)</p>
        <div class="num" style="color: #73AEFF">{{ this.nan }}</div>
      </van-col>
      <van-col span="12" class="item" style="margin: 2px 0 4px" @click="goList('女')">
        <p>东营区女公厕报警数（个)</p>
        <div class="num" style="color: #F87883">{{ this.nv }}</div>
      </van-col>
    </van-row>

    <div class="shitu" style="margin-bottom: 3px">
      <div class="charts">
        <div class="title">
          <div class="cBlock"></div>
          <div class="defen">东营区公厕卫生情况报警个数曲线图</div>
          <van-button type="primary" size="mini" @click="showwarning" class="datePickerBtn">
            {{ this.warningdata }}
            <van-icon class="icon" name="arrow-down" />
          </van-button>
        </div>
        <div id="barGraph" style="height: 300px; margin-top: -20px;"></div>
      </div>
    </div>

    <van-action-sheet
      style="margin-bottom: 50px"
      v-model="show"
      :actions="actions"
      @select="onSelect"
    />

    <div class="shitu">
      <div class="charts">
        <div class="title">
          <div class="cBlock"></div>
          <div class="defen">东营区管养单位公厕平均得分对比图</div>
          <van-button type="primary" size="mini" @click="showscore" class="datePickerBtn">
            {{ this.scoredata }}
            <van-icon class="icon" name="arrow-down" />
          </van-button>
        </div>
        <div id="main" style="height:400px;  margin-top: -20px;"></div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import qs from "qs";

const echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入柱状图
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

import Footer from "../footer/foot";
import Header from "../header/header";

export default {
  components: {
    Footer,
    Header
  },
  data() {
    return {
      total: null,
      Custody: null,
      nan: null,
      nv: null,
      version: "3.3",
      actions: [{ name: "日" }, { name: "月" }, { name: "年" }],
      show: false,
      change: "",
      warningdata: "月",
      scoredata: "月"
    };
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0);
    }
  },
  created() {
    this._upDateMemo();
  },
  mounted() {
    this.drawBar();
    this.drawColumn();
    this.getTotal();
    this.getCustody();
    this.getNan();
    this.getNv();
    this.init();
  },
  methods: {
    routerPushList() {
      this.$router.push({
        path: "/ToiletManagement/ToiletFile"
      });
    },
    routerPush() {
      this.$router.push({
        path: "/ToiletManagement/Appraisal"
      });
    }, //版本更新
    _upDateMemo() {
      this.$http
        .post(
          "download/updateVersion",
          this.$qs.stringify({ version: this.version })
        )
        .then(res => {
          console.log(res);
          if (res.status == "1") {
            console.log(res.msg);
          } else {
            location.href = this.$http.defaults.baseURL + "H5FAEA568.apk";
            localStorage.clear();
          }
        });
    },
    drawBar() {
      let arr1 = [];
      let arr2 = [];
      this.$http
        .post(
          "wc/warning/logs/getByUpdateTimeApp",
          this.$qs.stringify({ param: this.warningdata })
        )
        .then(res => {
          console.log(res.data);

          for (const key in res.data) {
            arr1.push(parseInt(key));
            arr2.push(res.data[key]);
          }
          // console.log(arr1);
          // console.log(arr2);

          // data =
          // 基于dom，初始化echarts实例
          let barGraph = echarts.init(document.getElementById("barGraph"));
          // 绘制图表
          barGraph.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{b}" + this.warningdata + "报警次数：{c}次"
            },
            legend: {},
            xAxis: {
              type: "category",
              name: "x",
              splitLine: { show: false },
              data: arr1,
              axisTick: {
                show: false
              }
            },
            grid: {
              left: "1%",
              right: "2%",
              bottom: "8%",
              containLabel: true
            },
            yAxis: {
              axisTick: {
                show: false
              }
            },
            series: [
              {
                type: "line",
                data: arr2
              }
            ]
          });
        });
    },
    drawColumn() {
      var gongsi = [];

      var df123 = new Array();

      this.$http
        .post(
          "wc/warning/logs/getScoreByTime",
          this.$qs.stringify({ param: this.scoredata })
        )
        .then(res => {
          for (const key in res.data) {
            let gs = key;
            let df = res.data[key];
            gongsi.push(gs);
            df123.push(parseInt(df));
          }

          // 基于准备好的dom，初始化echarts实例
          var myColumn = echarts.init(document.getElementById("main"));

          // 使用刚指定的配置项和数据显示图表。
          myColumn.setOption({
            color: ["#3398DB"],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            textStyle: {},
            label: {
              show: true,
              position: "top"
            },
            axisLabel: {
              interval: 0,
              formatter: function(value) {
                var ret = ""; //拼接加\n返回的类目项
                var maxLength = 2; //每项显示文字个数
                var valLength = value.length; //X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于3,
                  for (var i = 0; i < rowN; i++) {
                    var temp = ""; //每次截取的字符串
                    var start = i * maxLength; //开始截取的位置
                    var end = start + maxLength; //结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                } else {
                  return value;
                }
              }
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: gongsi,
                axisTick: {
                  length: 0
                },
                axisLabel: {
                  verticalAlign: "top"
                }
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "平均得分",
                type: "bar",
                barWidth: "60%",
                data: df123
              }
            ]
          });
        });
    },
    getTotal() {
      this.$http.get("android/wcinfo/getWcCounts").then(res => {
        this.total = res.data;
      });
    },
    getCustody() {
      this.$http.get("wcAndroid/organNumberAndroid").then(res => {
        this.Custody = res.data;
      });
    },
    getNan() {
      this.$http
        .get("android/wcinfo/getAllWcWarningCounts?sex=男")
        .then(res => {
          this.nan = res.data;
        });
    },
    getNv() {
      this.$http
        .get("android/wcinfo/getAllWcWarningCounts?sex=女")
        .then(res => {
          this.nv = res.data;
        });
    },
    init() {
      const self = this;
      setTimeout(() => {
        window.onresize = function() {
          // self.myColumn.echarts.resize();
        };
      }, 20);
    },
    goList(sex) {
      this.$router.push({
        name: "报警列表",
        params: { sex }
      });
    },
    onSelect(event) {
      if (this.change === "score") {
        this.scoredata = event.name;
        this.drawColumn();
      } else if (this.change === "warning") {
        this.warningdata = event.name;
        this.drawBar();
      }
      this.show = false;
    },
    showscore() {
      this.show = true;
      this.change = "score";
    },
    showwarning() {
      this.show = true;
      this.change = "warning";
    }
  }
};
</script>

<style scoped>
.homepage {
  position: relative;
  height: 100%;
  background-color: #f0f0f0;
  overflow-x: hidden;
}
.product {
  display: flex;
  background-color: #f0f0f0;
  z-index: 50;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: space-around;
}

.shitu {
  margin: 0px 1px 50px;
  background-color: #fff;
}

.num {
  font-size: 36px;
  font-weight: 700;
}

.title {
  position: relative;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  padding: 10px;
}

.cBlock {
  position: absolute;
  top: 10px;
  left: 15px;
  width: 5px;
  height: 20px;
  background-color: #73aeff;
}
.defen {
  float: left;
  margin-left: 20px;
}
.company {
  float: left;
  font-size: 12px;
  color: #ccc;
  line-height: 25px;
}

.item {
  width: 184px;
  height: 100px;
  background-color: #fff;
  border-radius: 5px;
}

.datePickerBtn {
  position: absolute;
  right: 25px;
  top: 10px;
  border-radius: 10px;
  color: #000;
  border: 0;
  line-height: 22px;
  background-color: #f0f0f0;
}
.icon {
  margin-top: 5px;
}
</style>

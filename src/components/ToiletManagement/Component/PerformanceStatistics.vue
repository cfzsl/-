<template>
  <!-- 首页 -->
  <div class="homepage">
    <div class="product">
      <div class="item">
        <p>东营区公共厕所（个)</p>
        <div class="num" style="color: green">{{ this.total }}</div>
      </div>
      <div class="item">
        <p>东营区管养单位总数（个)</p>
        <div class="num" style="color: orange">{{ this.Custody }}</div>
      </div>
      <div class="item">
        <p>东营区男公厕报警数（个)</p>
        <div class="num" style="color: blue">{{ this.nan }}</div>
      </div>
      <div class="item">
        <p>东营区女公厕报警数（个)</p>
        <div class="num" style="color: red">{{ this.nv }}</div>
      </div>
    </div>

    <div class="shitu">
      <!-- 图表位置 -->
      <div id="bar" style="height:250px;"></div>
    </div>
  </div>
</template>

<script>
const echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入柱状图
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  data() {
    return {
      total: null,
      Custody: null,
      nan: null,
      nv: null
    };
  },
  methods: {
    getTotal() {
      this.$http.get("wc/count").then(res => {
        console.log(res);
        this.total = res.data;
      });
    },
    getCustody() {
      this.$http.get("wcAndroid/organNumberAndroid").then(res => {
        this.Custody = res.data;
      });
    },
    getNan() {
      this.$http.get("wcAndroid/warningCount?sex=男").then(res => {
        this.nan = res.data;
      });
    },
    getNv() {
      this.$http.get("wcAndroid/warningCount?sex=女").then(res => {
        this.nv = res.data;
      });
    },
    drawBar() {
      // 初始化echarts实例
      const Bar = echarts.init(document.getElementById("bar"));

      // 渲染echarts图表
      Bar.setOption({
        title: {
          text: "世界人口总量",
          subtext: "数据来自网络"
        },
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "shadow"
        //   }
        // },
        // grid: { containLabel: true },
        xAxis: {
          show: false
        },
        yAxis: {
          type: "category",
          data: ["差", "良", "优"]
        },
        series: [
          {
            type: "bar",
            barWidth: "30%",
            data: [
              {
                value: 20,
                itemStyle: {
                  color: "#C70039"
                },
                label: {
                  normal: {
                    show: true,
                    position: "right"
                  }
                }
              },
              {
                value: 30,
                itemStyle: {
                  color: "#3EA1E5"
                },
                label: {
                  normal: {
                    show: true,
                    position: "right"
                  }
                }
              },
              {
                value: 100,
                itemStyle: {
                  color: "#3FED3E"
                },
                label: {
                  normal: {
                    show: true,
                    position: "right"
                  }
                }
              }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.drawBar();
  },
  created() {
    this.getTotal();
    this.getCustody();
    this.getNan();
    this.getNv();
  }
};
</script>

<style scoped>
.homepage {
  position: relative;
  height: 100%;
  background-color: #ccc;
  overflow-x: hidden;
}
.product {
  display: flex;
  background-color: #ccc;
  z-index: 50;
  overflow: hidden;
  flex-wrap: wrap;
  justify-content: space-around;
}
.product p {
  font-size: 12px;
  margin: 0;
  margin: 10px 0 5px 0;
}
.shitu {
  margin: 0px 1px 50px;
  background-color: #fff;
}
.num {
  font-size: 36px;
  font-weight: 700;
}
.item {
  width: 175px;
  height: 79px;
  margin: 3px 0;
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
}
</style>

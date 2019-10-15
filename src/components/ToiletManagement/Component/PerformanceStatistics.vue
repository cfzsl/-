<template>
  <!-- 绩效统计 -->
  <div class="homepage">
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

    <div style="margin-top: 46px">
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
      nv: null,
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
  background-color: #fff;
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
.product p {
  font-size: 12px;
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
  width: 184px;
  height: 90px;
  background-color: #fff;
  border-radius: 5px;
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

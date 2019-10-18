<template>
  <!-- 地图组件 -->
  <div class="mapbox">
    <div class="header">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        action-text="更多"
        @search="onSearch"
        @cancel="show"
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
    </div>

    <baidu-map class="map" center="东营" :zoom="15" :scroll-wheel-zoom="true">
      <MyOverlay
        v-for="item in this.list"
        :key="item.sid"
        :position="{lng: item.x, lat: item.y}"
        :text="item.wcName"
        :status="item.wcStatus"
        :id="item.sid"
      ></MyOverlay>
    </baidu-map>

    <div v-if="hidshow" class="footer">
      <div class="status">
        <van-row type="flex" justify="space-around">
          <van-col class="statusitem" span="8">
            <img src="../../../assets/img/grey.png" />
            <div>公厕未开启</div>
          </van-col>
          <van-col class="statusitem" span="8">
            <img src="../../../assets/img/green.png" />
            <div>公厕正常</div>
          </van-col>
          <van-col class="statusitem" span="8">
            <img src="../../../assets/img/red.png" />
            <div>公厕报警</div>
          </van-col>
        </van-row>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "../../footer/foot";
import MyOverlay from "../../MyOverlay";
export default {
  components: {
    MyOverlay,
    Footer
  },
  data() {
    return {
      list: null,
      value: "",
      toget: false,
      docmHeight: document.documentElement.clientHeight, //默认屏幕高度
      showHeight: document.documentElement.clientHeight, //实时屏幕高度
      hidshow: true //显示或者隐藏footer
    };
  },
  methods: {
    getList() {
      this.$http.get("wc/getPositionOnMapAndroid").then(res => {
        this.list = res.data;
      });
    },
    onSearch() {
      if (this.value) {
        this.$router.push({
          path: "/ToiletManagement/ToiletFile",
          query: {
            id: this.value
          }
        });
      } else {
        this.$router.push({
          path: "/ToiletManagement/ToiletFile"
        });
      }
    },
    show() {
      this.toget = !this.toget;
    },
    addClass(e) {
      e.target.addClass("active");
    },
    
  },
  created() {
    this.getList();
  },
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  //监听
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false;
      } else {
        this.hidshow = true;
      }
    }
  }
};
</script>

<style scoped>
.mapbox {
  height: 100%;
}
.map {
  height: 100%;
}

.status {
  position: fixed;
  bottom: 50px;
  width: 100%;
}
.status div {
  font-size: 15px;
}

.statusitem {
  width: 80px;
  height: 75px;
  background-color: #fff;
}

.statusitem img {
  width: 50%;
  height: 45%;
  padding: 10px 0 5px 0;
}

.menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 50px;
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

.active {
  color: #ccc;
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
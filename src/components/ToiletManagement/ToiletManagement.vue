<template>
  <!-- 公厕管理 -->
  <div class="bigbox">
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

    <transition>
      <router-view></router-view>
    </transition>

 

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../footer/foot";
export default {
  data() {
    return {
      value: '',
      toget: false
    };
  },
  components: {
    Footer
  },
  methods: {
    onSearch(){
      if(this.value){
        this.$router.push({
        path:'/ToiletManagement/ToiletFile',
        query:{
          id:this.value,
        }
      })
      }else {
        this.$router.push({
        path:'/ToiletManagement/ToiletFile',
      })
      }
    },
    show() {
      this.toget = !this.toget;
    },
    addClass(e) {
      console.log(e.target);
      e.target.addClass("active");
    }
  },
  created() {
  }
};
</script>

<style scoped>
body {
  height: 100%;
}
.bigbox {
  height: 100%;
}
.map {
  width: 100%;
  height: 100%;
}
.menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  top: 54px;
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

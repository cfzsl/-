<template>
  <!-- 系统管理 -->
  <div class="circumstance">
    <van-nav-bar
      class="navbar"
      :title="this.$route.name"
      fixed
      right-text="更多"
      @click-right="show"
    />
    <transition name="slide-fade">
      <div class="menu" v-show="toget" @click="show">
        <router-link to="/Management/">组织结构</router-link>
        <router-link to="/Management/UserManagement">用户管理</router-link>
        <router-link to="/Management/PermissionSetting">权限设置</router-link>
        <router-link to="/Management/OperationLog">操作日志</router-link>
      </div>
    </transition>

    <div class="contentbox">
      <router-view></router-view>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../footer/foot";
export default {
  data() {
    return {
      toget: false
    };
  },
  methods: {
    show() {
      this.toget = !this.toget;
    }
  },
  created() {
    console.log();
  },
  components: {
    Footer
  }
};
</script>


<style scoped>
.contentbox {
  margin-top: 46px;
  margin-bottom: 50px;
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

<template>
  <!-- 底部 -->
  <van-tabbar v-model="active" class="vant-bar TabBar">
    <router-link class="van-tabbar-item" to="/">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
    </router-link>
    <router-link class="van-tabbar-item" to="/publicdetails">
      <van-tabbar-item icon="search">公厕详情</van-tabbar-item>
    </router-link>
    <router-link class="van-tabbar-item" to="/ToiletManagement">
      <van-tabbar-item icon="friends-o">公厕管理</van-tabbar-item>
    </router-link>
    <router-link class="van-tabbar-item" to="/Management">
      <van-tabbar-item icon="search">系统管理</van-tabbar-item>
    </router-link>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style scoped>
.TabBar {
  z-index: 99999999 !important;
}
</style>
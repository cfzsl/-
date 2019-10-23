<template>
  <!-- 底部 -->
  <van-tabbar v-model="active" route class="vant-bar TabBar">
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/publicdetails/" icon="search">公厕详情</van-tabbar-item>
    <van-tabbar-item to="/ToiletManagement/" name="/ToiletManagement/ToiletFile" icon="location-o">公厕管理</van-tabbar-item>
    <van-tabbar-item to="/Management/" icon="setting-o">系统管理</van-tabbar-item>
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
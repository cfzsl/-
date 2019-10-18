<template>
  <div id="app">
    <!-- 插槽 -->
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Footer from "./components/footer/foot";
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {
    Footer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 15px;
  color: #2c3e50;
  background-color: #fff;
}
.van-nav-bar {
  border-bottom: 1px solid #d2d2d2;
}
</style>

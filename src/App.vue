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
  color: #2c3e50;
  background-color: #f0f0f0;
}
</style>

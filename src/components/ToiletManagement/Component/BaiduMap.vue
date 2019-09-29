<template>
<!-- 地图组件 -->
  <baidu-map class="map" center="东营" :zoom="15" :scroll-wheel-zoom="true">
    <MyOverlay
      v-for="item in this.list"
      :key="item.sid"
      :position="{lng: item.x, lat: item.y}"
      :text="item.name"
      :status="item.status"
      :id="item.sid"
    ></MyOverlay>
  </baidu-map>
</template>

<script>
import MyOverlay from "../../MyOverlay";
export default {
  components: {
    MyOverlay
  },
  data() {
    return {
      list: null
    };
  },
  methods: {
    getList() {
      this.$http.get("wc/post/Android/list").then(res => {
        this.list = res.data;
      });
    }
  },
  created() {
    this.getList()
  }
};
</script>

<style scoped>
</style>
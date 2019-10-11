<template>
  <!-- 地图组件 -->
  <!-- <div> -->
    <baidu-map class="map" center="东营" :zoom="15" :scroll-wheel-zoom="true">
      <MyOverlay
        v-for="item in this.list"
        :key="item.sid"
        :position="{lng: item.x, lat: item.y}"
        :text="item.wcName"
        :status="item.wcStatus"
        :id="item.sid"
      ></MyOverlay>
      <Footer />
    </baidu-map>
  <!-- </div> -->
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
      list: null
    };
  },
  methods: {
    getList() {
      this.$http.get("wc/getPositionOnMapAndroid").then(res => {
        console.log(res);

        this.list = res.data;
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
</style>
<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value2" :options="option2" />
    <van-dropdown-item v-model="value3" :options="status" />
  </van-dropdown-menu>
</template>

<script>
export default {
  data() {
    return {
      value2: 0,
      value3: 0,
      option2: [
        { text: "全部管养单位", value: 0 },
      ],
    };
  },
  props: ["status","list","toiletfile"],
  // watch:{
  //   'toiletfile': {
  //     handler(toiletfile, key) {
  //       console.log(toiletfile)
  //     },
  //     deep: true,
  //     immediate: true
  // },
  methods: {
    //数组去重
    _listIndex(){
      console.log(this.toiletfile)
  },
  created(){
    // console.log(this.list);
    _listIndex();
  }
}
}
</script>
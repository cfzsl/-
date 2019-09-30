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
  props: ["status","list"],
  methods: {
    //数组去重
    _listIndex(){
      var arr=[];
      for(var i=0; i< this.toiletfile.length; i++){
        if(arr.indexOf(this.toiletfile[i]) == -1){
          arr.push(this.toiletfile[i])
        }
        return console.log(arr)
      }
    }
  },
  created(){
    // console.log(this.list);
    // _listIndex();
  }
};
</script>
<template>
  <!-- 公厕档案 -->
  <div>
    <DropdownMenu :status="status" :toiletfile='toiletfile'></DropdownMenu>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-row
        v-for="item in toiletFileFilter()"
        :key="item.i"
        type="flex"
        justify="space-around"
        class="list"
        align="center"
      >
        <van-col span="4">{{ item.sid }}</van-col>
        <van-col span="6">{{ item.name }}</van-col>
        <van-col span="8">{{ item.depart }}</van-col>
        <van-col span="6">{{ item.status }}</van-col>
      </van-row>
    </van-pull-refresh>
  </div>
</template>

<script>
import DropdownMenu from "../../DropdownMenu.vue";
export default {
  data() {
    return {
      active: 0,
      toiletfile: [],
      count: 0,
      isLoading: false,
      text: null,
      status: [
        { text: "全部状态", value: 0 },
        { text: "开放使用", value: 1 },
        { text: "暂停使用", value: 2 },
        { text: "卫生报警", value: 3 }
      ]
    };
  },
  methods: {
    getToiletFile() {
      this.$http.get("android/wcinfo/list").then(res => {
        this.toiletfile = res.data;
      });
    },
    toiletFileFilter(){
      var name = this.$route.query.id;
      var toiletFileFilter = [];
      if(name!=''){
       return this.toiletfile.filter(item => item.name.indexOf(name)!== -1)
      }
      return this.toiletfile
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    Search() {
      // search 是 v-model="search" 的 search
      var search = this.search;
      if (search) {
        this.searchData = this.list.filter(function(product) {
          // 每一项数据
          // console.log(product)
          return Object.keys(product).some(function(key) {
            // 每一项数据的参数名
            // console.log(key)
            return (
              String(product[key])
                // toLowerCase() 方法用于把字符串转换为小写。
                .toLowerCase()
                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                .indexOf(search) > -1
            );
          });
        });
      }
    }
  },
  created() {
    this.getToiletFile();
    console.log(this.$route.query);
  },
  components: {
    DropdownMenu
  }
};
</script>


<style scoped>
.list {
  height: 35px !important;
  overflow: hidden;
  font-size: 12px;
  margin: 5px 0;
  border-bottom: 1px solid #000;
}
</style>

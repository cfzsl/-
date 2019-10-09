<template>
  <!-- 公厕列表 -->
  <div>
    <van-nav-bar title="公厕名" left-text="序号" right-text="状态" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="circumstance">
        <div class="circumstance_list">
          <div class="Product" v-for="item in list" :key="item.id" @click="goDetile(item.sid)">
            <van-row type="flex" justify="space-around">
              <van-col span="6">{{item.code}}</van-col>
              <van-col span="6" class="item">{{item.wcname}}</van-col>
              <van-col
                span="6"
                :style="{ color: item.c ? 'green' : 'red' }"
              >{{item.c ? "使用中" : "未使用"}}</van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-pull-refresh>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../footer/foot";
export default {
  data() {
    return {
      isLoading: false,
      list: null
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    goDetile(id) {
      this.$router.push({
        name: "管理视频",
        params: {
          id
        }
      });
    }
  },
  created() {
    this.$http.get("detailCurrent/findAll").then(res => {
      this.list = res.data;
    });
  },
  components: {
    Footer
  }
};
</script>


<style scoped>
.van-nav-bar__text {
  color: black;
  font-size: 16px;
  margin: 0 20px;
}

.Product {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
}

.van-nav-bar {
  background-color: #ccc !important;
}
.item {
  height: 50px;
  overflow: hidden;
}
</style>

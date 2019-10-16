<template>
  <!-- 公厕列表 -->
  <div>
    <van-nav-bar fixed title="公厕名" left-text="序号" right-text="状态" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="circumstance">
        <div class="circumstance_list">
          <div class="Product" v-for="item in list" :key="item.id" @click="goDetile(item.sid)">
            <van-row type="flex" justify="space-around">
              <van-col span="8">{{item.code}}</van-col>
              <van-col span="8" class="item">{{item.wcname}}</van-col>
              <van-col v-if="item.status === '0'" span="8" class="grey">离线</van-col>
              <van-col v-else-if="item.status === '1'" span="8" class="red">报警</van-col>
              <van-col v-else-if="item.status === '2'" span="8" class="green">正常</van-col>
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
        this.getList();
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
    },
    getList() {
      this.$http.get("detailCurrent/findAll").then(res => {
        this.list = res.data;
      });
    }
  },
  created() {
    this.getList();
  },
  components: {
    Footer
  }
};
</script>


<style scoped>
.circumstance {
  background-color: #fff;
  margin-top: 46px;
}
.van-nav-bar__text {
  color: black;
  font-size: 16px;
  margin: 0 15px;
}

.Product {
  font-size: 14px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #d2d2d2;
}

.van-nav-bar {
  background-color: #cae4fc !important;
}
.item {
  height: 50px;
  overflow: hidden;
}

.green {
  color: #a4de7f;
}
.grey {
  color: grey;
}
.red {
  color: red;
}
</style>

<template>
  <div>
    <div class="header">
      <van-nav-bar :title="$route.params.sex + '公厕' + $route.name " left-arrow @click-left="back" />

      <van-row class="titleitem">
        <van-col span="5">序号</van-col>
        <van-col span="9">报警{{this.$route.params.sex}}公厕名</van-col>
        <van-col span="9">报警类型</van-col>
        <van-col span="1"></van-col>
      </van-row>
    </div>

    <div class="box">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-collapse v-model="activeNames" :border="false">
          <van-collapse-item class="item" v-for="(item,i) in this.List" :key="item.id">
            <div slot="title">
              <van-row>
                <van-col span="4">{{ i + 1 }}</van-col>
                <van-col span="12">{{ item.wcname }}</van-col>
                <van-col span="8">{{ item.warningtype }}</van-col>
              </van-row>
            </div>
            <div class="content">
              <div>管养单位: {{ item.depart }}</div>
              <div>报警时间: {{ item.updatetime}}</div>
              <div>负责人姓名: {{ item.person}}</div>
              <div>负责人电话: {{ item.chargeTel}}</div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      List: [],
      date: false,
      currentDate: null,
      activeNames: [],
      isLoading: false
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
    getList() {
      if (this.$route.params.sex == "男") {
        this.$http.get("wc/warning/logs/get/sex/apk/man").then(res => {
          this.List = res.data;
        });
      } else if (this.$route.params.sex == "女") {
        this.$http.get("wc/warning/logs/get/sex/apk/woman").then(res => {
          this.List = res.data;
        });
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}
.box {
  margin-top: 75px;
}
.titleitem {
  font-size: 15px;
  background-color: #c2fbff;
  line-height: 30px;
}

.text {
  font-size: 12px;
}
.item {
  border-bottom: 1px solid #ccc !important;
}
.content {
  padding-left: 10px;
  text-align-last: left;
}
</style>
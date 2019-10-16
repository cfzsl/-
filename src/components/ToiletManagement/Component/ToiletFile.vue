<template>
  <!-- 公厕档案 -->
  <div>
    <van-nav-bar
      class="navbar"
      :title="this.$route.name"
      fixed
      right-text="更多"
      left-arrow
      @click-left="back"
      @click-right="show"
    />
    <transition name="slide-fade">
      <div class="menu" v-show="toget" @click="show">
        <router-link to="/ToiletManagement/ToiletFile">公厕档案</router-link>
        <router-link to="/ToiletManagement/">公厕分布</router-link>
        <router-link to="/ToiletManagement/Appraisal">绩效考核</router-link>
        <router-link to="/ToiletManagement/PerformanceStatistics">绩效统计</router-link>
        <router-link to="/ToiletManagement/Rules">绩效规则</router-link>
        <router-link to="/ToiletManagement/CommentReview">评论审核</router-link>
        <router-link to="/ToiletManagement/CommentList">评论查看</router-link>
      </div>
    </transition>

    <van-dropdown-menu>
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>

    <van-row class="item">
      <van-col span="3">序号</van-col>
      <van-col span="8">公厕名</van-col>
      <van-col span="7">管养单位</van-col>
      <van-col span="6">状态</van-col>
    </van-row>

    <van-pull-refresh class="filebox" v-model="isLoading" @refresh="onRefresh">
      <van-row
        v-for="item in toiletFile()"
        :key="item.i"
        type="flex"
        justify="space-around"
        class="list"
        align="center"
        @click="goDetile(item.sid)"
      >
        <van-col span="3">{{ item.sid }}</van-col>
        <van-col span="8">{{ item.name }}</van-col>
        <van-col span="7">{{ item.depart }}</van-col>
        <van-col span="6">{{ item.status }}</van-col>
      </van-row>
    </van-pull-refresh>
  </div>
</template>

<script>
import { async } from "q";
export default {
  data() {
    return {
      active: 0,
      toiletfile: [],
      listHost: [],
      count: 0,
      isLoading: false,
      text: null,
      value2: 0,
      value3: 0,
      option2: [{ text: "全部管养单位", value: 0 }],
      option3: [
        { text: "全部状态", value: 0 },
        { text: "开放使用", value: 1 },
        { text: "暂停使用", value: 2 },
        { text: "即将开放", value: 3 }
      ],
      toget: false
    };
  },
  methods: {
    // 获取list
    getToiletFile() {
      this.$http.get("android/wcinfo/list").then(res => {
        this.toiletfile = res.data;
        for (let i = 0; i < this.toiletfile.length; i++) {
          if (this.listHost.indexOf(this.toiletfile[i].depart) == -1) {
            this.listHost.push(this.toiletfile[i].depart);
          }
        }
        let v = 1;
        for (let j = 0; j < this.listHost.length; j++) {
          this.option2.push({
            text: this.listHost[j],
            value: v++
          });
        }
      });
    },
    toiletFile() {
      let id = this.$route.query.id;
      if (this.value2 != 0) {
        let text = this.option2[this.value2].text;
        return this.toiletfile.filter(item => item.depart == text);
      } else if (this.value3 != 0) {
        let text = this.option3[this.value3].text;
        return this.toiletfile.filter(item => item.status == text);
      } else if (id) {
        return this.toiletfile.filter(item => item.name.indexOf(id) !== -1);
      }
      return this.toiletfile;
    },
    onRefresh() {
      setTimeout(() => {
        this.getToiletFile();
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
    },
    goDetile(id) {
      this.$router.push({
        name: "管理视频",
        params: {
          id
        }
      });
    },
    show() {
      this.toget = !this.toget;
    },
    back() {
      this.$router.go(-1);
      this.show();
    }
  },
  created() {
    this.getToiletFile();
  },
  components: {}
};
</script>


<style scoped>
.list {
  height: 35px !important;
  overflow: hidden;
  font-size: 12px;
  margin: 5px 0;
  border-bottom: 1px solid #d2d2d2;
}
.item {
  position: fixed;
  top: 46px;
  width: 100%;
  font-size: 15px;
  background-color: #cae4fc;
  line-height: 30px;
  z-index: 9;
}
.filebox {
  margin-top: 25px;
}
.menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  top: 46px;
  z-index: 10;
  background-color: #fff;
}
.menu a {
  display: block;
  width: 93px;
  font-size: 12px;
  padding: 5px 0 10px 0;
  color: #000;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

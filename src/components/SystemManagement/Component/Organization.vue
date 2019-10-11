<template>
  <!-- 组织结构 -->
  <div>
    <van-button type="primary" size="small" class="newbtn" color="#09f" @click="show">新增</van-button>

    <van-row class="topbar">
      <van-col span="12">名称</van-col>
      <van-col span="4">编号</van-col>
      <van-col span="8">操作</van-col>
    </van-row>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="refresh">
      <van-row
        v-for="item in list"
        :key="item.sid"
        type="flex"
        justify="space-around"
        class="list"
        align="center"
      >
        <van-col span="12">{{ item.name }}</van-col>
        <van-col span="4">{{ item.code }}</van-col>
        <van-col span="8">
          <div class="btnbox">
            <div class="btn new" @click="show(item)">编辑</div>
            <div class="btn delete" @click="del(item.sid)">删除</div>
          </div>
        </van-col>
      </van-row>
    </van-pull-refresh>

    <van-dialog v-model="showManagement" title="新增组织结构" show-cancel-button @confirm="submit">
      <van-cell-group>
        <van-field
          v-model="data.name"
          label="单位名称"
          placeholder="请输入单位名称"
          rows="1"
          :value="data.name"
        />
        <van-field
          v-model="data.code"
          label="部门编号"
          placeholder="请输入部门编号"
          rows="1"
          :value="data.code"
        />
      </van-cell-group>
    </van-dialog>
    <Footer />
  </div>
</template>

<script>
import { Toast } from "vant";
import Footer from "../../footer/foot";
export default {
  data() {
    return {
      list: null,
      isLoading: false,
      showManagement: false,
      data: {
        sid: null,
        name: null,
        code: null
      }
    };
  },
  methods: {
    getStructure() {
      this.$http.get("organ/post/all/android").then(res => {
        this.list = res.data;
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    show(item) {
      if (item) {
        this.data.sid = item.sid;
        this.data.name = item.name;
        this.data.code = item.code;
      }
      this.showManagement = !this.showManagement;
    },
    submit() {
      if (this.data.sid) {
        if (this.data.name && this.data.code) {
          this.$http
            .post("organ/updateOrg", this.$qs.stringify(this.data))
            .then(res => {
              res ? Toast.success("编辑成功") : Toast.fail("编辑失败");
              this.getStructure();
            });
        } else {
          Toast.fail("信息不能为空");
        }
      } else {
        if (this.data.name && this.data.code) {
          this.$http
            .post("organ/insertOrg", this.$qs.stringify(this.data))
            .then(res => {
              res ? Toast.success("新增成功") : Toast.fail("新增失败");
              this.getStructure();
            });
        } else {
          Toast.fail("请输入完整内容");
        }
      }
      this.data = {};
    },
    del(sid) {
      this.$http.post("organ/delOrg", this.$qs.stringify({ sid })).then(res => {
        res ? Toast.success("删除成功") : Toast.fail("删除失败");
        this.getStructure();
      });
    }
  },
  created() {
    this.getStructure();
  },
  components: {
    Footer
  }
};
</script>

<style scoped>
.newbtn {
  position: relative;
  top: -7px;
  right: -140px;
  font-size: 12px;
  border-radius: 5px;
}
.topbar {
  font-size: 15px;
  height: 30px;
  line-height: 30px;
  background-color: #E7E7E7;
  z-index: 99;
}
.list {
  height: 35px !important;
  font-size: 12px;
  margin: 5px 0;
  border-bottom: 1px solid #000;
}

.btnbox {
  display: flex;
  justify-content: center;
}
.btn {
  width: 50px;
  color: #fff;
  border-radius: 5px;
}
.delete {
  background-color: red;
}
.new {
  background-color: #0099ff;
  margin-right: 5px;
}
</style>
<template>
  <div>
    <div class="header">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        action-text="新增"
        @search="onSearch()"
        @cancel="showEdit"
      />
      <van-row class="titlebox">
        <van-col span="6">序号</van-col>
        <van-col span="8">用户名</van-col>
        <van-col span="9">管养单位</van-col>
        <van-col span="1"></van-col>
      </van-row>
    </div>
    <!-- 列表 -->
    <van-collapse class="userbox" v-model="activeNames" :border="false">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-collapse-item class="item" :name="item.sid" v-for="item in userList" :key="item.sid">
          <div slot="title">
            <van-row>
              <van-col span="4">{{ item.num}}</van-col>
              <van-col span="13">{{ item.username}}</van-col>
              <van-col span="6">{{ item.departName}}</van-col>
            </van-row>
          </div>
          <div class="content">
            <div>性别: &emsp;{{ item.gender }}</div>
            <div>手机: &emsp;{{ item.tel }}</div>
            <div>电话: &emsp;{{ item.mobile }}</div>
            <div>邮箱: &emsp;{{ item.email }}</div>
          </div>
          <div class="edit" @click="showEdit(item)">编辑</div>
          <div class="detele" @click="del(item.sid)">删除</div>
        </van-collapse-item>
      </van-pull-refresh>
    </van-collapse>

    <!-- 弹出层 -->
    <van-dialog
      closeOnClickOverlay
      v-model="showManagement"
      title="用户管理"
      show-cancel-button
      @confirm="operating"
      @cancel="data = {}"
    >
      <van-cell-group>
        <van-field
          v-model="data.username"
          label="用户名"
          type="textarea"
          placeholder="请输入用户名"
          rows="1"
          autosize
          :value="data.username"
        />
        <div class="sexBox">
          <div class="selectSex">性别</div>
          <van-radio-group v-model="data.gender" class="sex">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </div>

        <van-field
          v-model="data.departName"
          label="部门"
          type="textarea"
          placeholder="请输入部门"
          rows="1"
          autosize
          :value="data.departName"
        />
        <van-field
          v-model="data.mobile"
          label="电话"
          type="number"
          placeholder="请输入电话"
          rows="1"
          autosize
          :value="data.mobile"
        />
        <van-field
          v-model="data.tel"
          label="手机号"
          type="number"
          placeholder="请输入手机号"
          rows="1"
          autosize
          :value="data.tel"
        />
        <van-field
          v-model="data.email"
          label="邮箱"
          type="textarea"
          placeholder="请输入邮箱"
          rows="1"
          autosize
          :value="data.email"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import Dialog from "../../component/Dialog.vue";
import { Toast } from "vant";
export default {
  data() {
    return {
      searchValue: null,
      activeNames: [0],
      userList: null,
      showManagement: false,
      sid: null,
      data: {
        gender: "男",
        username: null,
        departName: null,
        mobile: null,
        tel: null,
        email: null
      },
      isLoading: false
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.getUserList();
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    showEdit(item) {
      if (item) {
        this.data.sid = item.sid;
        this.data.username = item.username;
        this.data.departName = item.departName;
        this.data.mobile = parseInt(item.mobile);
        this.data.tel = parseInt(item.tel);
        this.data.gender = item.gender;
        this.data.email = item.email;
      }
      this.showManagement = !this.showManagement;
    },
    getUserList() {
      this.$http.get("user/findByUsername?username=").then(res => {
        console.log(res);
        
        this.userList = res;
      });
    },
    operating() {
      if (this.data.sid) {
        this.$http
          .post("user/updateUserBySid", this.$qs.stringify(this.data))
          .then(res => {
            res ? Toast.success("编辑成功") : Toast.fail("编辑失败");
          });
        this.getUserList();
        this.data = {};
      } else {
        this.$http.post("user/add", this.$qs.stringify(this.data)).then(res => {
          res ? Toast.success("新增成功") : Toast.fail("新增失败");
        });
      }
      // this.searchValue = null;
      this.getUserList();
    },
    del(id) {
      this.$http
        .post("user/post/delete", this.$qs.stringify({ id }))
        .then(res => {
          res ? Toast.success("删除成功") : Toast.fail("删除失败");
          this.getUserList();
        });
    },
    onSearch() {
      this.$http
        .post(
          "user/findByUsername",
          this.$qs.stringify({
            username: this.searchValue
          })
        )
        .then(res => {
          this.userList = res;
        });
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 9;
}

.userbox {
  margin-top: 150px;
}

.titlebox {
  height: 50px;
  line-height: 50px;
  background-color: #cae4fc;
}

.item {
  border-bottom: 1px solid #d2d2d2 !important;
}

.content {
  padding-left: 30px;
  overflow: hidden;
}
.content div {
  float: left;
  width: 100%;
  text-align: left;
  padding-bottom: 10px;
}

.edit,
.detele {
  width: 90px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  margin: 0 30px;
  border: none;
  border-radius: 4px;
  color: #fff;
}

.edit {
  background-color: #8fd662;
}
.detele {
  background-color: #f88279;
}

.selectSex {
  float: left;
  margin-left: 36px;
  margin-right: 27px;
}
.sexBox {
  position: relative;
  padding: 10px;
}
.sexBox ::after {
  position: absolute;
  box-sizing: border-box;
  content: "";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0.42667rem;
  border-bottom: 0.02667rem solid #f5f6f8;
  transform: scaleY(0.5);
}
.sex {
  display: flex;
}
.sex div {
  padding-right: 25px;
}
</style>
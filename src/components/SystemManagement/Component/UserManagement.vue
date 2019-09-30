<template>
  <div>
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      show-action
      action-text="新增"
      @search="onSearch()"
      @cancel="showEdit"
    />
    <!-- 列表 -->
    <van-collapse v-model="activeNames">
      <van-collapse-item :name="item.sid" v-for="item in userList" :key="item.sid">
        <div slot="title">
          <van-row>
            <van-col span="8">{{ item.sid}}</van-col>
            <van-col span="8">{{ item.username}}</van-col>
            <van-col span="8">{{ item.departName}}</van-col>
          </van-row>
        </div>
        <div class="content">
          <div>手机号:{{ item.tel }}</div>
          <div>性别:{{ item.gender }}</div>
          <div>邮箱：{{ item.email }}</div>
          <div>电话：{{ item.mobile }}</div>
        </div>
        <div class="edit" @click="showEdit(item)">编辑</div>
        <div class="detele" @click="del(item.sid)">删除</div>
      </van-collapse-item>
    </van-collapse>

    <!-- 弹出层 -->
    <van-dialog v-model="showManagement" title="用户管理" show-cancel-button @confirm="operating">
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
      }
    };
  },
  methods: {
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
      } else {
        this.$http.post("user/add", this.$qs.stringify(this.data)).then(res => {
          res ? Toast.success("新增成功") : Toast.fail("新增失败");
        });
      }
      this.searchValue = null;
      this.getUserList();
    },
    del(id) {
      this.$http
        .post("user/post/delete", this.$qs.stringify({ id }))
        .then(res => {
          res ? Toast.success("删除成功") : Toast.fail("删除失败");
          this.getUserList();
          this.searchValue = null;
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
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.content div {
  width: 130px;
  padding-bottom: 10px;
}

.edit,
.detele {
  width: 90px;
  display: inline-block;
  margin: 0 30px;
  border: 1px solid #ccc;
  border-radius: 7px;
  color: #fff;
}

.edit {
  background-color: #66cc99;
}
.detele {
  background-color: #ff6666;
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
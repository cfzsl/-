<template>
  <!-- 权限设置 -->
  <div class="bigbox">
    <van-row class="titlebox" type="flex" justify="space-around">
      <van-col span="6">序号</van-col>
      <van-col span="8">用户</van-col>
      <van-col span="1"></van-col>
      <van-col span="4">状态</van-col>
      <van-col span="5">操作</van-col>
    </van-row>

    <van-pull-refresh class="setbox" v-model="isLoading" @refresh="onRefresh">
      <div class="list" v-for="item in permissionList" :key="item.sid">
        <van-row type="flex" justify="space-around">
          <van-col span="6">{{ item.sid}}</van-col>
          <van-col span="8">{{ item.username}}</van-col>
          <van-col span="6">{{ parseInt(item.status) ? "启用" : "禁用"}}</van-col>
          <van-col span="4">
            <div class="btn" @click="show(item)">编辑</div>
          </van-col>
        </van-row>
      </div>
    </van-pull-refresh>

    <van-dialog
      v-model="showDialog"
      closeOnClickOverlay
      title="权限管理"
      show-cancel-button
      @confirm="submit"
    >
      <div class="sexBox">
        <div class="selectSex">状态</div>
        <van-radio-group v-model="data.status" class="sex">
          <van-radio name="1">启用</van-radio>
          <van-radio name="0">禁用</van-radio>
        </van-radio-group>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      activePermission: [0],
      permissionList: null,
      showDialog: false,
      data: {
        id: null,
        status: null
      },
      isLoading: false
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.getPermission();
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 500);
    },
    getPermission() {
      this.$http.get("user/post/all").then(res => {
        this.permissionList = res;
      });
    },
    show(item) {
      this.data.id = item.sid;
      this.data.status = item.status;
      this.showDialog = !this.showDialog;
    },
    submit() {
      this.$http
        .post("user/permission/update", this.$qs.stringify(this.data))
        .then(res => {
          res ? Toast.success("修改成功") : Toast.fail("修改失败");
          this.getPermission();
        });
    }
  },
  created() {
    this.getPermission();
  }
};
</script>

<style scoped>
.titlebox {
  position: fixed;
  top: 46px;
  width: 100%;
  font-size: 15px;
  background-color: #cae4fc;
  line-height: 30px;
  z-index: 9;
}
.setbox {
  margin-top: 76px;
}
.bigbox {
  font-size: 15px;
}
.list {
  padding: 15px 0;
  line-height: 25px;
  border-bottom: 1px solid #d2d2d2;
}
.btn {
  width: 50px;
  height: 25px;
  line-height: 25px;
  color: #fff;
  border-radius: 5px;
  background-color: #a4de7f;
  text-align: center;
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
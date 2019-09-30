<template>
  <div class="bigbox">
    <div class="list" v-for="item in permissionList" :key="item.sid">
      <van-row type="flex" justify="space-around">
        <van-col span="6">{{ item.sid}}</van-col>
        <van-col span="8">{{ item.username}}</van-col>
        <van-col span="6">{{ item.status ? "启用" : "禁用"}}</van-col>
        <van-col span="4">
          <div class="btn" @click="show">编辑</div>
        </van-col>
      </van-row>
    </div>

    <van-dialog v-model="showDialog" title="权限管理" show-cancel-button>
      <div class="sexBox">
        <div class="selectSex">状态</div>
        <van-radio-group v-model="sex" class="sex">
          <van-radio name="1">启用</van-radio>
          <van-radio name="2">禁用</van-radio>
        </van-radio-group>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePermission: [0],
      permissionList: null,
      showDialog: false,
      sex: "1"
    };
  },
  methods: {
    getPermission() {
      this.$http.get("user/post/all").then(res => {
        this.permissionList = res;
      });
    },
    show() {
      this.showDialog = !this.showDialog;
    }
  },
  created() {
    this.getPermission();
  }
};
</script>

<style scoped>
.bigbox {
  font-size: 15px;
}
.list {
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}
.btn {
  width: 50px;
  color: #fff;
  border-radius: 5px;
  background-color: green;
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
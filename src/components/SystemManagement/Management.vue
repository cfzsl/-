<template>
  <!-- 系统管理 -->
  <div class="circumstance">
    <van-tabs
      class="subfield"
      sticky
      :offset-top="46"
      swipeable
      animated
      title-active-color="blue"
      background="#CCFFFF"
      color="blue"
    >
      <van-tab title="组织结构">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-row
            v-for="item in list"
            :key="item.sid"
            type="flex"
            justify="space-around"
            class="list"
            align="center"
          >
            <van-col span="12">{{ item.name }}</van-col>
            <van-col span="6">{{ item.code }}</van-col>
            <van-col span="6">
              <div class="btn">删除</div>
            </van-col>
          </van-row>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="用户管理">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          action-text="新增"
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
              <div>手机号:{{ item.tel}}</div>
              <div>性别:{{ item.gender }}</div>
              <div>邮箱：{{ item.email}}</div>
              <div>电话：{{ item.mobile}}</div>
            </div>
            <div class="edit" @click="showEdit(item.sid)">编辑</div>
            <div class="detele">删除</div>
          </van-collapse-item>
        </van-collapse>
      </van-tab>

      <van-tab title="权限设置">
        <van-collapse v-model="activePermission">
          <van-collapse-item :name="item.sid" v-for="item in userList" :key="item.sid">
            <div slot="title">
              <van-row>
                <van-col span="8">{{ item.sid}}</van-col>
                <van-col span="8">{{ item.username}}</van-col>
                <van-col span="8">{{ item.status ? "启用" : "禁用"}}</van-col>
              </van-row>
            </div>
            <van-col span="12" class="perBtn enable">启用</van-col>
            <van-col span="12" class="perBtn disable">禁用</van-col>
          </van-collapse-item>
        </van-collapse>
      </van-tab>

      <van-tab title="操作日志">
        <div class="month">
          <van-button type="primary" size="mini" @click="showPicker" class="datePickerBtn">本月</van-button>

          <div class="text">共X条数据</div>
        </div>

        <van-row
          class="list"
          type="flex"
          justify="space-around"
          v-for="item in logList"
          :key="item.id"
          align="center"
        >
          <van-col span="12">{{ item.operatetime | formatDate }}</van-col>
          <van-col span="12">{{ item.operatedetail }}</van-col>
        </van-row>
      </van-tab>
    </van-tabs>

    <!-- 弹出层 -->
    <van-dialog v-model="showManagement" title="用户管理" show-cancel-button>
      <van-cell-group>
        <van-field
          v-model="message"
          label="用户名"
          type="textarea"
          placeholder="请输入用户名"
          rows="1"
          autosize
          :value="message"
        />
        <div class="sexBox">
          <div class="selectSex">性别</div>
          <van-radio-group v-model="sex" class="sex">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </div>

        <van-field
          v-model="message"
          label="部门"
          type="textarea"
          placeholder="请输入部门"
          rows="1"
          autosize
          :value="message"
        />
        <van-field
          v-model="message"
          label="电话"
          type="textarea"
          placeholder="请输入电话"
          rows="1"
          autosize
          :value="message"
        />
        <van-field
          v-model="message"
          label="手机号"
          type="textarea"
          placeholder="请输入手机号"
          rows="1"
          autosize
          :value="message"
        />
        <van-field
          v-model="message"
          label="邮箱"
          type="textarea"
          placeholder="请输入邮箱"
          rows="1"
          autosize
          :value="message"
        />
      </van-cell-group>
    </van-dialog>

    <!-- 时间选择 -->
    <van-datetime-picker
      class="datepicker"
      v-show="date"
      v-model="currentDate"
      type="year-month"
      :formatter="formatter"
      @confirm="selectDate"
      @cancel="showPicker"
    />

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../footer/foot";
export default {
  data() {
    return {
      list: null,
      count: 0,
      isLoading: false,
      activeNames: [0],
      userList: null,
      permissionList: null,
      showManagement: false,
      message: null,
      sex: "1",
      value: null,
      activePermission: [0],
      date: false,
      currentDate: new Date(),
      logList: null
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
    getUserList() {
      this.$http.get("user/findByUsername?username=").then(res => {
        this.userList = res;
      });
    },
    getPermission() {
      this.$http.get("user/post/all").then(res => {
        this.permissionList = res;
      });
    },
    getOperationLog() {
      this.$http.get("operateLog/post/all").then(res => {
        console.log(res);
        this.logList = res;
      });
    },
    showEdit() {
      this.showManagement = !this.showManagement;
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      }
      return value;
    },
    showPicker() {
      this.date = !this.date;
    },
    selectDate(value) {
      console.log(value);
      this.showPicker();
    }
  },
  created() {
    this.getStructure();
    this.getUserList();
    this.getPermission();
    this.getOperationLog();
  },
  filters: {
    formatDate(time) {
      let date = new Date(time); //Mon Jan 19 1970 01:28:27 GMT+0800 (中国标准时间)
      let year = date.getFullYear();
      let month = date.getMonth();
      month = month + 1 > 10 ? month : "0" + month;
      let day = date.getDate();
      day = day + 1 > 10 ? day : "0" + day;
      let hour = date.getHours();
      hour = hour + 1 > 10 ? hour : "0" + hour;
      let minte = date.getMinutes();
      minte = minte + 1 > 10 ? minte : "0" + minte;
      let second = date.getSeconds();
      second = second + 1 > 10 ? second : "0" + second;

      return (
        year +
        "-" +
        month +
        "-" +
        day +
        "   " +
        hour +
        ":" +
        minte +
        ":" +
        second
      );
    }
  },
  components: {
    Footer
  }
};
</script>


<style scoped>
.btn {
  height: 20px;
  width: 90px;
  text-align: center;
  line-height: 20px;
  border-radius: 5px;
  background-color: pink;
  color: #fff;
}
.list {
  height: 35px !important;
  overflow: hidden;
  font-size: 12px;
  margin: 5px 0;
  border-bottom: 1px solid #000;
}
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
  height: 24px;
  padding: 10px;
}
.sexBox ::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
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

.item {
  font-size: 15px;
}
.perBtn {
  height: 35px;
  text-align: center;
  line-height: 35px;
  color: #fff;
}

.disable {
  background-color: red;
}
.enable {
  background-color: green;
}

.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #ccc;
  margin-bottom: 10px;
}

.text {
  font-size: 12px;
}

.picker {
  line-height: 10px;
}

.datePickerBtn {
  border-radius: 10px;
  background-color: #fff;
  color: #000;
  border: 0;
  margin-left: 10px;
}
.datepicker {
  width: 100%;
  position: fixed;
  bottom: 50px;
  z-index: 999;
}
</style>

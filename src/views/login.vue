<template>
  <div class="loding">
    <div class="lodingBgc"></div>
    <div class="login">
      <div class="loginTop">
        <div class="phone"></div>
        <input type="text" placeholder="手机号" v-model="phone" style="text-indent:37px" :class="{'newTopInput':test}" class='topInput' @focus='test' />
      </div>
      <div class="loginBot">
        <div class='loginBotLift'>
          <div class="massge"></div>
          <input type="text"  placeholder="短信验证码" v-model="sms" style="text-indent:37px" class="botInput" />
        </div>
        <input type="button"  value="获取验证码" class="button" @click="getCode" />
        <!-- <input type="button" v-else-if="!button" class="newButton" /> -->
      </div>
      <div>
        <van-button type="info" class="loginButton" @click="getLogin">登&nbsp; &nbsp;录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import qs from "qs";
import { userInfo } from "os";
export default {
  data() {
    return {
      phone: "",
      sms: "",
      button: true,
      codeMit: 0,
      userInfo: "",
      border:false
    };
  },
  methods: {
    test(){
      this.border=false;
    },
    getCode() {
      let zet = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.phone == "") {
        Toast("请输入手机号");
      } else if (!zet.test(this.phone)) {
        Toast("请输入正确的手机号");
      } else if (zet.test(this.phone)) {
        let date = {
          username: this.phone
        };
        console.log(date);
        this.$http
          .post("login/sendUsername", this.$qs.stringify(date))
          .then(res => {
            console.log(res);
            res.status = 1
              ? Toast.success("短信发送成功")
              : Toast.fail("短信发送失败");
          });
        this.button = false;
        this.codeMit = 60;
        var codeTime = setInterval(() => {
          if (this.codeMit <= 0) {
            clearInterval(codeTime);
            this.button = true;
          }
          this.codeMit--;
        }, 1000);
      }
    },
    getLogin() {
      let date = {
        username: this.phone,
        code: this.sms
      };
      this.$http.post("login/log", this.$qs.stringify(date)).then(res => {
        this.userInfo = res.data;
        console.log(this.userInfo);
      });
      localStorage.setItem("token", this.userInfo.token);
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped >
.lodingBgc {
  background: url("../assets/img/login_background.png") no-repeat;
  background-size: 375px auto;
  width: 100%;
  height: 286px;
}
.login {
  margin: 12px 19px 0px 22px;
}
.loginTop,.loginBot {
  position: relative;
  width: 319px;
  height: 38px;
  margin-bottom: 26px;
  margin: 0 auto 26px; 
}
.phone {
  background: url("../assets/iconfont/phone_u.png") no-repeat;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 13px;
  left: 14px;
  z-index: 99;
}
.newTopInput {
  border: 1px #3082ff solid !important;
}
input {
  width: 319px;
  height: 38px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 0px;
  margin-bottom: 26px;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #b4b4b4;
  font-size: 16px;
  line-height: 38px;
}
.loginBotLift {
  position: relative;
  float: left;
}
.massge {
  background: url("../assets/iconfont/messasge_u.png") no-repeat;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 13px;
  left: 12px;
  z-index: 99;
}
.botInput {
  /* position: absolute; */
  width: 224px;
  float: left;
}
.button {
  margin-left: 12px;
  /* position: absolute; */
  width: 80px;
  height: 41px;
  float: right;
  font-size: 12px;
  color: #b4b4b4;
  background-color: #fff;
}
.loginButton {
  width: 321px;
  height: 42px;
  border-radius: 4px;
}
</style>
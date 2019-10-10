<template>
  <div class="loding">
    <div class="lodingBgc"></div>
    <div class="login">
      <div class="loginTop">
        <div class="phone" :class="{'iphone':border}"></div>
        <input
          type="text"
          placeholder="手机号"
          v-model="phone"
          style="text-indent:37px"
          :class="{'newTopInput':border}"
          class="topInput"
          @focus="changStyle"
          @blur="_changStyle"
        />
      </div>
      <div class="loginBot">
        <div class="loginBotLift">
          <div class="massge" :class="{'newMassge':border2}"></div>
          <input
            type="text"
            placeholder="短信验证码"
            v-model="sms"
            style="text-indent:37px"
            class="botInput"
            :class="{'newbotInput':border2}"
            @focus="changStyle2"
            @blur="_changStyle2"
          />
        </div>
        <input type="button" v-if="button" class="button" @click="getCode" value="获取验证码" />
        <input
          type="button"
          v-else-if="!button"
          class="button"
          :class="{'newButton':border}"
          :value="codeMit"
        />
      </div>
      <div>
        <van-button type="info" class="loginButton" @click="getLogin">登&nbsp; &nbsp;录</van-button>
      </div>
      <div class="text">武汉旭瑞创想信息技术</div>
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
      border: false,
      border2: false,
      isUpdate: null
    };
  },
  methods: {
    changStyle() {
      this.border = true;
    },
    _changStyle() {
      this.border = !this.border;
    },
    changStyle2() {
      this.border2 = true;
    },
    _changStyle2() {
      this.border2 = !this.border2;
    },
    getCode() {
      // console.log(this.phone)
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
            res.status == 1
              ? Toast.success("短信发送成功")
              : Toast.fail(res.msg);
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
        console.log(res);
        this.userInfo = res.data;
        localStorage.setItem("token", this.userInfo.token);
        if (this.userInfo.token) {
          this.$router.push({ path: "/" });
        } else {
          Toast("验证码错误");
        }
        this.isUpdate = res.isUpdate;
        if (this.isUpdate) {
          location.href = "http://47.110.160.217:5080/app/download";
        } else {
          console.log("没有新版本");
        }
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
.text {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #b4b4b4;
}
.login {
  position: relative;
  margin: 12px 19px 0px 22px;
}
.loginTop {
  position: relative;
}
.loginBot {
  position: relative;
}
.phone {
  background: url("../assets/iconfont/phone_u.png") no-repeat;
  background-size: 20px 20px;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 12px;
  left: 14px;
  z-index: 99;
}
.iphone {
  background: url("../assets/iconfont/phone_s.png") no-repeat !important;
}
.newTopInput {
  border: 1px #3082ff solid !important;
}
input {
  float: left;
  width: 319px;
  height: 38px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 0px;
  margin-bottom: 26px;
  font-size: 16px;
  width: 99%;
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
  background-size: 20px 20px;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 12px;
  left: 14px;
  z-index: 99;
}
.newMassge {
  background: url("../assets/iconfont/message_s.png") no-repeat !important;
}
.botInput {
  /* position: absolute; */
  width: 224px;
  float: left;
}
.newbotInput {
  border: 1px #3082ff solid !important;
}
.button {
  margin-left: 12px;
  /* position: absolute; */
  width: 80px;
  height: 41px;
  float: right;
  font-size: 12px;
  color: #3082ff;
  background-color: #fff;
  border: 1px #3082ff solid;
}
.newButton {
  border: 1px #3082ff solid !important;
  color: #3082ff !important;
}
.loginButton {
  width: 321px;
  height: 42px;
  border-radius: 4px;
}
</style>
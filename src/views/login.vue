<template>
  <div class="loding">
    <div class="lodingBgc"></div>
    <div class='login'>
      <van-cell-group>
        <van-field v-model="phone" left-icon="contact" class='topInput'  placeholder="手机号" />
        <van-field v-model="sms" left-icon="contact" class='bottomInput' center clearable placeholder="短信验证码">
          <van-button v-if='button' slot="button" size="small" type="primary" color="#7232dd" plain @click='getCode'>发送验证码</van-button>
          <van-button v-else-if='!button' slot="button" size="small" color="#7232dd" plain type="primary">&nbsp;&nbsp;{{codeMit}}s &nbsp;&nbsp;</van-button>
        </van-field>
      </van-cell-group>
      <div>
        <van-button type="info" class="loginButton" @click='getLogin'>登&nbsp; &nbsp;录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import qs from 'qs'
import { userInfo } from 'os';
export default {
  data() {
    return {
        phone:'',
        sms:'',
        button:true,
        codeMit: 0,
        userInfo:''
    };
  },
  methods:{
    getCode(){
      let zet = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if(this.phone==''){
        Toast('请输入手机号')
      }else if(!zet.test(this.phone)){
        Toast('请输入正确的手机号')
      }else if(zet.test(this.phone)){
        let date= {
          username:this.phone
        }
        console.log(date)
        this.$http
          .post("login/sendUsername", this.$qs.stringify(date))
          .then(res => {
            console.log(res)
            res.status= 1 ? Toast.success("短信发送成功") : Toast.fail("短信发送失败");
          })
          this.button=false;
          this.codeMit= 60;
          var codeTime = setInterval(() => {
            if(this.codeMit<=0){
              clearInterval(codeTime)
              this.button=true;
            }
            this.codeMit--
          },1000)
      }
    },
    getLogin(){
      let date= {
        username:this.phone,
        code:this.sms
      }
      this.$http
        .post("login/log", this.$qs.stringify(date))
        .then(res => {
          this.userInfo=res.data
          console.log(this.userInfo)
        })
        localStorage.setItem('token', this.userInfo.token)
        this.$router.push({
          path:'/'
        })      
    }
  }
};
</script>

<style scoped >
.lodingBgc {
    background: url('../assets/img/login_background.png') no-repeat;
    background-size: 375px auto;
    width: 100%;
    height: 286px;
}
.login {
  margin:12px 19px 0px 20px;
}
.loginButton {
  margin-top: 26px;
  width: 321px;
  height: 42px;
}
</style>
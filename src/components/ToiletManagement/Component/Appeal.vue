<template>
  <div class="appealbox">
    <van-nav-bar title="报警申诉" fixed left-arrow @click-left="onClickLeft">
      <div slot="right">申诉</div>
    </van-nav-bar>

    <div class="contentbox">
      <div class="contentitem">
        <van-radio-group class="radio" v-model="radio"></van-radio-group>
        <van-row type="flex" justify="space-around">
          <van-col span="8">
            <div class="title">申诉公厕：</div>
          </van-col>
          <van-col span="10">
            <van-radio-group v-model="radio" class="sex">
              <van-radio name="男" class="sexitem">男厕</van-radio>
              <van-radio name="女">女厕</van-radio>
            </van-radio-group>
          </van-col>
          <van-col span="6"></van-col>
        </van-row>
      </div>
      <div class="contentitem">
        <van-row>
          <van-col span="8">申诉理由：</van-col>
          <van-col span="8">
            <textarea class="textarea"></textarea>
          </van-col>
          <van-col span="8"></van-col>
        </van-row>
      </div>
      <div class="contentitem">
        <van-row>
          <van-col span="8">
            <div class="title">申诉凭证：</div>
          </van-col>
          <van-col span="8">
            <van-uploader v-model="fileList" multiple />
          </van-col>
        </van-row>
        <div class="toast">* 请选择上传图片</div>
      </div>

      <div class="contentitem">
        <van-button class="btn" round type="info">提交申诉</van-button>
      </div>
      <div class="contentitem">
        <div class="title">
          <div class="red">提示：</div>
          <div class="content">
            <div>1、非管养单位主因的报警才能申诉撤销</div>
            <div>2、三天之内可进行报警申诉，超过三天无法申诉</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "男",
      fileList: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.appealbox {
  font-size: 15px;
}
.contentbox {
  margin-top: 46px;
  text-align-last: left;
  padding-left: 10px;
}
.contentitem {
  width: 100%;
  padding: 20px 0;
  overflow: hidden;
}
.sex {
  display: flex;
  text-align: left;
}
.sexitem {
  margin-right: 30px;
}

.textarea {
  width: 230px;
  height: 50px;
  line-height: 20px;
  border-radius: 5px;
}

.btn {
  margin-left: 40%;
}
.toast {
  height: 10px;
  font-size: 12px;
  color: #d2d2d2;
  margin-left: 120px;
}

.red {
  color: red;
}
.content {
  padding-left: 20px;
}
</style>
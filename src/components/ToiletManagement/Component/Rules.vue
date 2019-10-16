<template>
  <div class="bigboxx">
    <van-nav-bar
      class="navbar"
      :title="this.$route.name"
      fixed
      right-text="更多"
      left-arrow
      @click-left="back"
      @click-right="show"
    />
    <transition name="slide-fade">
      <div class="menu" v-show="toget" @click="show">
        <router-link to="/ToiletManagement/ToiletFile">公厕档案</router-link>
        <router-link to="/ToiletManagement/">公厕分布</router-link>
        <router-link to="/ToiletManagement/Appraisal">绩效考核</router-link>
        <router-link to="/ToiletManagement/PerformanceStatistics">绩效统计</router-link>
        <router-link to="/ToiletManagement/Rules">绩效规则</router-link>
        <router-link to="/ToiletManagement/CommentReview">评论审核</router-link>
        <router-link to="/ToiletManagement/CommentList">评论查看</router-link>
      </div>
    </transition>
    <div class="box">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="绩效规则" name="1" class="rules">
          <div>
            总分：
            <span class="max">{{ this.data.countgrade }}</span> 分
          </div>
          <div>
            男厕报警扣
            <span class="red">{{ this.data.mgrade }}</span> 分/次
          </div>
          <div>
            女厕报警扣
            <span class="red">{{ this.data.wgrade }}</span> 分/次
          </div>
          <div>
            男女厕所同时报警扣
            <span class="red">{{ this.data.mgrade + this.data.wgrade }}</span> 分/次
          </div>
          <div>最后得分=总分-报警扣除的分数</div>
          <div>月度统计时得分&gt;= {{ this.data.gradeLevel1 }} 分,绩效为优</div>
          <div>月度统计时得分&gt;= {{ this.data.gradeLevel2 }} 分且得分&lt; {{ this.data.gradeLevel1 }} 分,绩效为良</div>
          <div>月度统计时得分&gt;= {{ this.data.gradeLevel3 }} 分且得分&lt; {{ this.data.gradeLevel2 }} 分,绩效为差,扣除 {{ this.data.penalty1 }}</div>
          <div>元</div>
          <div>月度统计时得分&lt;= {{ this.data.gradeLevel3 }} 分,绩效为差，扣除 {{ this.data.penalty2 }} 元</div>
        </van-collapse-item>
        <van-collapse-item title="修改规则" name="2">
          <div class="buttom">
            <div class="border">
              总分：
              <input type="number" v-model="mesg.countgrade" /> 分
            </div>
            <div class="border">
              <div>
                男厕报警扣
                <input type="number" v-model="mesg.mgrade" /> 分/次
              </div>
              <div>
                女厕报警扣
                <input type="number" v-model="mesg.wgrade" /> 分/次
              </div>
              <div>
                男女厕同时报警扣
                <input type="number" readonly :value="Summation" /> 分/次
              </div>
            </div>
            <div class="border">
              <div>
                月度统计时得分&gt;=
                <input type="number" v-model="mesg.gradeLevel1" /> 分,绩效为优
              </div>
              <div>
                月度统计时得分&gt;=
                <input type="number" v-model="mesg.gradeLevel2" /> 分
              </div>
              <div>
                且得分&lt;
                <input type="number" v-model="mesg.gradeLevel1" />分,绩效为良
              </div>
            </div>
            <div class="border">
              <div>
                月度统计时得分&gt;=
                <input type="number" v-model="mesg.gradeLevel3" /> 分
              </div>
              <div>
                且得分&lt;
                <input type="number" v-model="mesg.gradeLevel2" /> 分
              </div>
              <div>
                绩效为差，扣除
                <input type="number" v-model="mesg.penalty2" /> 元
              </div>
            </div>
            <div class="border">
              <div>
                月度统计时得分&lt;=
                <input type="number" v-model="mesg.gradeLevel3" /> 分
              </div>
              <div>
                绩效为差，扣除
                <input type="number" v-model="mesg.penalty1" /> 元
              </div>
            </div>
            <div>
              备注：
              <input type="text" class="remark" v-model="mesg.comment" />
            </div>
          </div>
          <van-row type="flex" justify="space-around" class="btn">
            <van-col span="12">
              <van-button type="info" @click="submit">提交</van-button>
            </van-col>
            <van-col span="12">
              <van-button plain type="info"  @click="re">重置</van-button>
            </van-col>
          </van-row>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      mesg: {
        id: null,
        countgrade: null,
        mgrade: null,
        wgrade: null,
        gradeLevel1: null,
        gradeLevel2: null,
        gradeLevel3: null,
        penalty1: null,
        penalty2: null,
        comment: null
      },
      data: {},
      activeNames: [],
      toget: false
    };
  },
  methods: {
    show() {
      this.toget = !this.toget;
    },
    back() {
      this.$router.go(-1);
      this.show();
    },
    getRule() {
      this.$http.get("wcAndroid/appraisalAndroid/getAll").then(res => {
        this.data = res.data;
      });
    },
    re() {
      this.mesg = {};
    },
    submit() {
      var num = 0;
      for (const key in this.mesg) {
        if (this.mesg[key]) {
          num++;
        }
        if (num == 9) {
          this.$http
            .post("appraisal/rules/edit", this.$qs.stringify(this.mesg))
            .then(res => {
              res ? Toast.success("编辑成功") : Toast.fail("编辑失败");
              this.mesg = {};
              this.getRule();
            });
        } else {
          Toast.fail("请输入所有信息");
        }
      }
    }
  },
  created() {
    this.getRule();
  },
  computed: {
    Summation: function() {
      return parseInt(this.mesg.mgrade) + parseInt(this.mesg.wgrade);
    }
  }
};
</script>

<style scoped>
.box {
  margin-bottom: 50px;
  font-size: 15px;
  text-align: left;
  margin-top: 50px;
}
.max {
  color: #a4de7f;
}
.red {
  color: red;
}

.border {
  border: 1px solid #ccc;
  margin: 10px 0;
  border-radius: 5px;
  padding: 10px;
}

.border div {
  height: 35px;
  line-height: 35px;
}

.splitline {
  position: relative;
  width: 97%;
  text-align: center;
  overflow: hidden;
}
.text {
  display: inline-block;
  z-index: 99;
  width: 100px;
  height: 35px;
  line-height: 35px;
  background-color: #fff;
}
.dashed {
  position: absolute;
  width: 100%;
  top: 16px;
  border-bottom: 1px dashed #ccc;
  z-index: -1;
}
.buttom input {
  width: 80px;
  height: 10px;
  border: 0px;
  border-bottom: 1px solid #ccc;
}

.buttom .remark {
  width: 250px;
  height: 20px;
  border: 1px solid #ccc;
}

.btn {
  padding-top: 15px;
  text-align: center;
}

.btn button {
  width: 150px;
}

.rules div {
  height: 35px;
  line-height: 35px;
}

.menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  top: 46px;
  z-index: 10;
  background-color: #fff;
}
.menu a {
  display: block;
  width: 93px;
  font-size: 12px;
  padding: 5px 0 10px 0;
  color: #000;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
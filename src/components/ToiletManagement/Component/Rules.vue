<template>
  <div class="bigboxx">
    <div class="box">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="绩效规则" name="1">
          <div>
            总分：
            <span class="max">{{ this.data.countgrade }}</span> 分
          </div>
          <div>
            男厕报警扣
            <span class="red">{{ this.data.mgrade }}</span> 分/次，女厕报警扣
            <span class="red">{{ this.data.wgrade }}</span> 分/次，男女厕所同时报警扣
            <span class="red">{{ this.data.mgrade + this.data.wgrade }}</span> 分/次
          </div>
          <div>最后得分=总分-报警扣除的分数</div>
          <div>月度统计时得分&gt;= {{ this.data.gradeLevel1 }} 分,绩效为优</div>
          <div>月度统计时得分&gt;= {{ this.data.gradeLevel2 }} 分且得分&lt; {{ this.data.gradeLevel1 }} 分,绩效为良</div>
          <div>月度统计时得分&gt;= {{ this.data.gradeLevel3 }} 分且得分&lt; {{ this.data.gradeLevel2 }} 分,绩效为差，扣除 {{ this.data.penalty1 }} 元</div>
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
                <br>且得分&lt;
                <input type="number" v-model="mesg.gradeLevel1" />分,绩效为良
              </div>
            </div>
            <div class="border">
              月度统计时得分&gt;=
              <input type="number" v-model="mesg.gradeLevel3" /> 分
              <br>
              且得分&lt;
              <input type="number" v-model="mesg.gradeLevel2" /> 分
              <br>
              绩效为差，扣除
              <input type="number" v-model="mesg.penalty2" /> 元
            </div>
            <div class="border">
              月度统计时得分&lt;=
              <input type="number" v-model="mesg.gradeLevel3" /> 分
              <br>
              绩效为差，扣除
              <input type="number" v-model="mesg.penalty1" /> 元
            </div>
            <div>
              备注：
              <input type="text" class="remark" v-model="mesg.comment" />
            </div>
          </div>
          <van-row type="flex" justify="space-around" class="btn">
            <van-col span="12">
              <van-button type="primary" @click="submit">提交</van-button>
            </van-col>
            <van-col span="12">
              <van-button color="#7232dd" @click="re">重置</van-button>
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
        comment: null,
      },
      data: {},
      activeNames: [],
      
    };
  },
  methods: {
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
    Summation: function () {
      return parseInt(this.mesg.mgrade) + parseInt(this.mesg.wgrade)
    }
  }
};
</script>

<style scoped>
.bigboxx {
  font-size: 15px;
  text-align: left;
  font-weight: 700;
}
.max {
  color: green;
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
</style>
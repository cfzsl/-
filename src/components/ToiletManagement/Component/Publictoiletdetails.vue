<template>
  <!-- 公厕详情页 -->
  <div class="father">
    <Back class="header" :title="this.PublicMsg.name"></Back>
    <div class="pos">
      <van-tabs v-model="videoactive" swipeable color="#0099ff">
        <van-tab v-for="(item, i) in video" :key="i" :title="'摄像头' + (i + 1)">
          <div class="player">
            <video-player
              class="video-player"
              ref="videoPlayer"
              :playsinline="true"
              :options="playerOptions(item.address)"
            ></video-player>
          </div>
        </van-tab>
        <div class="warning" v-if="video.length === 0">此公厕暂无监控</div>
      </van-tabs>
    </div>

    <div class="contentbox">
      <div class="textcontent">
        <van-row type="flex" justify="space-around" class="texttitle">
          <van-col span="12">公厕信息</van-col>
          <van-col span="12"></van-col>
        </van-row>
        <div class="text">
          <div>
            <b>厕所名称：</b>
            {{ this.PublicMsg.name }}
          </div>
          <div>
            <b>联系人:</b>
            {{ this.PublicMsg.memo }}
          </div>
          <div>
            <b>联系人电话:</b>
            {{ this.PublicMsg.chargetel }}
          </div>
          <div>
            <b>管养单位:</b>
            {{ this.PublicMsg.depart }}
          </div>
          <div>
            <b>地址：</b>
            {{ this.PublicMsg.addressmemo }}
          </div>
          <div>
            <b>当前状态：</b>
            {{ this.PublicMsg.status }}
          </div>
          <div>
            <b>服务：</b>
            {{ this.PublicMsg.servicename }}
          </div>
          <div>
            <b>报警次数:</b>
            {{ this.WarningMsg.length }}
          </div>
          <div>
            <b>最后接收数据时间:</b>
            {{ this.PublicMsg.time }}
          </div>
        </div>
      </div>

      <van-tabs v-model="active" swipeable class="item" color="#0099ff">
        <div class="content">
          <van-tab title="男厕">
            <van-row class="contentitem" type="flex" justify="space-around">
              <van-col span="1"></van-col>
              <van-col span="11">
                温度:
                <span class="green">{{ this.details.tempm }}&#8451;</span>
              </van-col>
              <van-col span="12">
                湿度:
                <span class="green">{{ this.details.humm }}&#37;</span>
              </van-col>
            </van-row>
            <van-row class="contentitem" type="flex" justify="space-around">
              <van-col span="1"></van-col>
              <van-col span="23">
                硫化氢:
                <span v-if="this.h2sm" class="green">{{ this.details.h2sm }}PPM</span>
                <span v-if="!this.h2sm" class="red">{{ this.details.h2sm }}PPM</span>
                <span>（标准值 ≤ {{ this.rules.maxh2smvalue }}PPM)</span>
              </van-col>
            </van-row>
            <van-row class="contentitem" type="flex" justify="space-around">
              <van-col span="1"></van-col>
              <van-col span="23">
                氨气:
                <span v-if="this.nh4m" class="green">{{ this.details.nh4m }}PPM</span>
                <span v-if="!this.nh4m" class="red">{{ this.details.nh4m }}PPM</span>
                <span>（标准值 ≤ {{ this.rules.maxnh4mvalue }}PPM)</span>
              </van-col>
            </van-row>
          </van-tab>
          <van-tab title="女厕">
            <van-row class="contentitem" type="flex" justify="space-around">
              <van-col span="1"></van-col>
              <van-col span="11">
                温度:
                <span class="green">{{ this.details.tempw }}&#8451;</span>
              </van-col>
              <van-col span="12">
                湿度:
                <span class="green">{{ this.details.humw }}&#37;</span>
              </van-col>
            </van-row>

            <van-row class="contentitem" type="flex" justify="space-around">
              <van-col span="1"></van-col>
              <van-col span="23">
                硫化氢:
                <span v-if="this.h2sw" class="green">{{ this.details.h2sw }}PPM</span>
                <span v-if="!this.h2sw" class="red">{{ this.details.h2sw }}PPM</span>
                <span>（标准值 ≤ {{ this.rules.maxh2swvalue }}PPM)</span>
              </van-col>
            </van-row>
            <van-row class="contentitem" type="flex" justify="space-around">
              <van-col span="1"></van-col>
              <van-col span="23">
                氨气:
                <span v-if="this.nh4w" class="green">{{ this.details.nh4w }}PPM</span>
                <span v-else class="red">{{ this.details.nh4w }}PPM</span>
                <span>（标准值 ≤ {{ this.rules.maxnh4wvalue }}PPM)</span>
              </van-col>
            </van-row>
          </van-tab>
        </div>
      </van-tabs>

      <div>
        <van-row style="padding:10px 0" type="flex" justify="space-around">
          <van-col span="4">序号</van-col>
          <van-col span="6">报警信息</van-col>
          <van-col span="11">报警时间</van-col>
          <van-col span="3">报警值</van-col>
        </van-row>

        <van-row
          class="msgitem"
          type="flex"
          justify="space-around"
          v-for="(item,i) in WarningMsg"
          :key="item.id"
        >
          <van-col span="4">{{ i + 1 }}</van-col>
          <van-col span="6">{{ item.warningtype }}</van-col>
          <van-col span="11">{{ item.updatetime }}</van-col>
          <van-col span="3">{{ item.warningvalue }}</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import Back from "../../component/back";
export default {
  data() {
    return {
      video: {},
      active: 0,
      videoactive: 0,
      details: {},
      h2sm: null,
      nh4m: null,
      h2sw: null,
      nh4w: null,
      PublicMsg: {},
      WarningMsg: [{}],
      rules: []
    };
  },
  components: {
    videoPlayer,
    Back
  },
  methods: {
    playerOptions(address) {
      return {
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "4:3", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src: address //你的m3u8地址（必填）
          }
        ],
        poster: "../../../assets/img/logo.png", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      };
    },
    getDetails() {
      this.$http
        .post(
          "detailCurrent/android/sid",
          this.$qs.stringify({ sid: this.$route.params.id })
        )
        .then(res => {
          this.details = res.data;
          this.getList();
        });
    },
    getList() {
      this.$http.post("warningRules/list").then(result => {
        this.rules = result;
        this.details.h2sm > result.maxh2smvalue
          ? (this.h2sm = false)
          : (this.h2sm = true);
        this.details.nh4m > result.maxnh4mvalue
          ? (this.nh4m = false)
          : (this.nh4m = true);
        this.details.h2sw > result.maxh2swvalue
          ? (this.h2sw = false)
          : (this.h2sw = true);
        this.details.nh4w > result.maxnh4wvalue
          ? (this.nh4w = false)
          : (this.nh4w = true);
      });
    },
    getPublicMsg() {
      this.$http
        .post("wc/findOne", this.$qs.stringify({ sid: this.$route.params.id }))
        .then(res => {
          this.PublicMsg = res.data;
        })
        .then(res => {
          this.getWarningMsg();
          this.getPublicVideo();
        });
    },
    getWarningMsg() {
      this.$http
        .post(
          "/wc/warning/logs/get/wcname",
          this.$qs.stringify({ wcName: this.PublicMsg.name })
        )
        .then(res => {
          this.WarningMsg = res;
        });
    },
    getPublicVideo() {
      this.$http
        .post(
          "wcAndroid/getWcVideoApp",
          this.$qs.stringify({ wcname: this.PublicMsg.name })
        )
        .then(res => {
          console.log(res);
          this.video = res.data;
        });
    }
  },
  created() {
    this.getDetails();
    this.getPublicMsg();
  }
};
</script>

<style scoped>
.father {
  overflow: hidden;
}

.pos {
  position: fixed;
  top: 46px;
  width: 100%;
}

.bigbox {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.bigbox div {
  font-size: 12px;
  border: 1px solid #0099ff;
  padding: 10px;
}

.left {
  border-radius: 20px 0 0 20px;
  padding-left: 30px !important;
}

.right {
  border-radius: 0 20px 20px 0;
  padding-right: 30px !important;
}

.active {
  background-color: #0099ff !important;
  color: #fff;
}

.contentbox {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
}

.content {
  padding-top: 20px;
}
.contentitem {
  padding-bottom: 10px;
  text-align-last: left;
}

.green {
  color: green;
}
.red {
  color: red;
}

.item {
  border-bottom: 3px solid #f0f0f0;
  border-top: 3px solid #f0f0f0;
}

.text div {
  padding-bottom: 10px;
}

.texttitle {
  padding: 10px;
  font-size: 20px;
}
.textcontent {
  margin-top: 371px;
  text-align: left;
  padding-left: 10px;
}

.msgitem {
  padding: 10px 0;
  border-top: 1px solid #ccc;
}

.video-player {
  height: 380px;
  background-color: #000;
}

.warning {
  line-height: 290px;
  background-color: #000;
  color: white;
  height: 310px;
}
</style>
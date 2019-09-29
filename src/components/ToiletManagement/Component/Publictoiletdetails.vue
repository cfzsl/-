<template>
  <!-- 公厕详情页 -->
  <div class="father">
    <div class="pos">
      <Back title="标题"></Back>

      <div class="bigbox">
        <div @click="go1" :class="{left: true, active: active1}">摄像头1</div>
        <div @click="go2" :class="{right: true, active: active2}">摄像头2</div>
      </div>

      <div class="player">
        <video-player
          class="video-player"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
    </div>

    <van-tabs v-model="active" swipeable class="item" color="#0099ff">
      <van-tab title="男厕">内容</van-tab>
      <van-tab title="女厕">内容</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import Back from "../../component/back";
export default {
  data() {
    return {
      video1: null,
      video2:
        "http://hls01open.ys7.com/openlive/f515aa55a63f429d8169f069a9ac9986.m3u8",
      playerOptions: {
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "4:3", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src: this.video1 //你的m3u8地址（必填）
          }
        ],
        poster: "../../../assets/img/logo.png", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      active: 0,
      active1: true,
      active2: false
    };
  },
  components: {
    videoPlayer,
    Back
  },
  methods: {
    go1() {
      console.log(this.video1);
      this.playerOptions.sources[0].src = this.video1;
      this.active2 = false;
      this.active1 = true;
    },
    go2() {
      this.playerOptions.sources[0].src = this.video2;
      this.active1 = false;
      this.active2 = true;
    },
    getDetails(id) {
      this.$http.post("detail/findDetail", {
        params: {}
      });
    }
  },
  created() {
    this.playerOptions.sources[0].src =
      "http://hls01open.ys7.com/openlive/84542f96d64846d590ff75d3382173c6.m3u8";
    this.video1 = this.playerOptions.sources[0].src;
    console.log(this.$route.params.id);
  }
};
</script>

<style scoped>
.father {
  overflow: hidden;
}

.pos {
  position: fixed;
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

.item {
  margin-top: 385px;
}
</style>
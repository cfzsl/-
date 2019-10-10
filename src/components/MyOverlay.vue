<template>
  <!-- 点组件 -->
  <bm-overlay
    :class="{sample: true, green: background1, grey: background2, red: background3}"
    pane="labelPane"
    @draw="draw"
  >
    <div
      v-text="text"
      @touchmove="touchmove"
      @touchend="touchend"
      @click="pointClick"
      :class="{text}"
    ></div>
  </bm-overlay>
</template>

<script>
export default {
  data () {
    return {
      background1: false,
      background2: false,
      background3: false,
      map: ''
    }
  },
  props: ['text', 'position', 'status', 'id'],
  methods: {
    draw ({ el, BMap, map }) {
      this.map = map
      const { lng, lat } = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 10 + 'px'
      el.style.top = pixel.y - 30 + 'px'
      // var icon = new BMap.Icon(
      //   '../assets/img/marker_background_green.png',
      //   new BMap.Size(126, 36),
      //   {
      //     anchor: new BMap.Size(63, 18),
      //     imageOffset: new BMap.Size(0 - 20, 0 - 17)
      //   }
      // )
    },
    // 百度 touch 事件模拟点击事件
    // 触摸移动时触发此事件 此时开启可以拖动。虽然刚初始化该地图不可以拖动，但是可以触发拖动事件。
    touchmove (e) {
      this.map.enableDragging()
    },
    // 触摸结束时触发次此事件  此时开启禁止拖动
    touchend (e) {
      this.map.disableDragging()
    },
    pointClick () {
      this.$router.push({
        name: '管理视频',
        params: {
          id: this.id
        }
      })
    },
    bgimg (status) {
      if (status == 2) {
        this.background1 = true
      } else if (status == 0) {
        this.background2 = true
      } else if (status == 1) {
        this.background3 = true
      }
    }
  },
  created () {
    this.bgimg(this.status)
  }
}
</script>

<style scoped>
.sample {
  width: 130px;
  height: 36px;
  line-height: 30px;
  color: #fff;
  position: absolute;
  overflow: hidden;
}
.green {
  background-image: url("../assets/img/marker_background_green.png");
  background-repeat: no-repeat;
}
.grey {
  background-image: url("../assets/img/marker_background_grey.png");
  background-repeat: no-repeat;
}
.red {
  background-image: url("../assets/img/marker_background_red.png");
  background-repeat: no-repeat;
}

.text {
  height: 100%;
  padding-left: 30px;
  font-size: 15px;
}
</style>

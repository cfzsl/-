<template>
  <div>
    <van-button type="primary" size="mini" @click="showPicker" class="datePickerBtn">
      本月
      <van-icon class="icon" name="arrow-down" />
    </van-button>

    <van-datetime-picker
      class="datepicker"
      v-show="date"
      v-model="currentDate"
      type="year-month"
      :formatter="formatter"
      @confirm="selectDate"
      @cancel="showPicker"
    />

    <van-overlay :show="date" @click="date = false" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: false,
      currentDate: new Date()
    };
  },
  methods: {
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
  }
};
</script>

<style scoped>
.datePickerBtn {
  position: absolute;
  right: 25px;
  top: 10px;
  border-radius: 10px;
  color: #000;
  border: 0;
  line-height: 22px;
  background-color: #f0f0f0;
}
.icon {
  margin-top: 5px;
}
.datepicker {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
}
</style>
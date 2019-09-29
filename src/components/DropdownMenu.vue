<template>
  <van-dropdown-menu>
    <van-dropdown-item v-model="value2" :options="option2" />
    <van-dropdown-item v-model="value3" :options="status" />
  </van-dropdown-menu>
</template>

<script>
export default {
  data() {
    return {
      value2: 0,
      value3: 0,
      option2: [
        { text: "全部管养单位", value: 0 },
        { text: "环卫1部", value: 1 },
        { text: "环卫2部", value: 2 }
      ],
    };
  },
  props: ["status"]
};
</script>
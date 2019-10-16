<template>
  <van-nav-bar fixed :z-index=99 :title="this.title" left-text left-arrow @click-left="back" />
</template>

<script>
export default {
  props: ["title"],
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
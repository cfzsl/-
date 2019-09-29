<template>
  <van-nav-bar :title="this.title" left-text left-arrow @click-left="back" />
</template>

<script>
export default {
  props: ["title"],
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>
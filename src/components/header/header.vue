<template>
  <!-- 头部 -->
  <div class="log">
    <van-nav-bar :title=" $route.name ">
      <van-icon name="search" slot="right" />
    </van-nav-bar>
  </div>
</template>

<style scoped>
.log {
  height: 46px;
}
</style>
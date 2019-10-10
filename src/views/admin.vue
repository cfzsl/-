<template>
  <!-- 登录之前的页面 -->
  <div class='lodin'>
      <div class='lodinCenter'>
          东区智慧公厕监管平台
      </div>
      <div class='lodinBot'>
          <p>技术支持：东营市旭瑞智能科技股份有限公司</p>
          <p>联系电话：0546-7773897</p>
      </div>
  </div>
</template>

<script>


export default {
 
};
</script>

<style scoped>
 .lodin {
     background: url('../assets/img/ic_splash.png') no-repeat;
     background-size: 375px auto;
     width: 100%;
     height: 100%;
 }
 .lodinCenter {
     position: fixed;
     width: 308px;
     height: 36px;
     top:180px;
     left: 33px;
     font-size: 28px;
     line-height: 36px;
     color: #fff;
     font-weight: 700;
 }
 .lodinBot{
     width: 240px;
     height: 34px;
     position: fixed;
     bottom: 12px;
     left: 67px;
     font-size: 12px;
     color: #fff;
 }
 .lodinBot p {
     margin: 0;
 }
</style>
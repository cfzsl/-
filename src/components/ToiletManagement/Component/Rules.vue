<template>
  <div class="bigbox">
    <div>总分：<span class="max">100</span> 分</div>
    <div>男厕报警扣 <span class="red">1</span> 分/次，女厕报警扣 <span class="red">1</span> 分/次，男女厕所同时报警扣 <span class="red">2</span> 分/次</div>
    <div>最后得分=总分-报警扣除的分数</div>
    <div>月度统计时得分>=分,绩效为优</div>
    <div>月度统计时得分>=60分且得分<分,绩效为良</div>
    <div>月度统计时得分>=50分且得分<分,绩效为差，扣除200元</div>
    <div>月度统计时得分<=分,绩效为差，扣除500元</div>
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>
.bigbox {
  font-size: 15px;
  text-align: left;
  padding: 10px;
}
.max {
  color: green;
}
.red {
  color: red;
}
</style>
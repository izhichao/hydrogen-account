<template>
  <div class="docker">
    <a href="" class="docker__item iconfont">&#xe78b;</a>
    <a href="" class="docker__item">2</a>
    <a href="" class="docker__item">3</a>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.docker {
  position: absolute;
  display: flex;
  align-items: center;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-top: 1px solid #ccc;
  padding: 0 20px;
  box-sizing: border-box;

  &__item {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
  <div class="main-content">
    <Circle></Circle>
    <div class="header"></div>

    <div class="cardList">
      <Card title="图表">
        <div class="price">-123.01</div>
        <div class="chart"></div>
      </Card>

      <Card title="最近交易">
        <ul class="recent">
          <li class="recent__item">
            <div>
              <div class="recent__item__title">购物</div>
              <div class="recent__item__desc">手机壳</div>
            </div>
            <div class="recent__item__price">-4.58</div>
          </li>
          <li class="recent__item">
            <div>
              <div class="recent__item__title">购物</div>
              <div class="recent__item__desc">手机壳</div>
            </div>
            <div class="recent__item__price">-4.58</div>
          </li>
          <li class="recent__item">
            <div>
              <div class="recent__item__title">购物</div>
            </div>
            <div class="recent__item__price">-4.58</div>
          </li>
        </ul>
      </Card>

      <Card title="所有账户"></Card>
    </div>
  </div>
  <Docker :currentIndex="0"></Docker>
</template>

<script lang="ts" setup>
import Card from '../../components/Card.vue';
import Circle from '../../components/Circle.vue';
import Docker from '../../components/Docker.vue';
</script>

<style lang="less" scoped>
.header {
  height: 50px;
}

.price {
  font-size: 20px;
  font-weight: 700;
  color: #ff6c7a;
  margin-bottom: 10px;
}

.chart {
  height: 150px;
  background-color: #ccc;
}

.recent {
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 24px;
    height: 34px;

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #ff6c7a;
    }

    &__title {
      font-size: 14px;
      font-weight: 700;
    }

    &__desc {
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>

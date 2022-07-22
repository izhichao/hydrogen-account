<template>
  <div class="main-content">
    <Circle></Circle>
    <div class="cardList">
      <Card :showHeader="false">
        <div class="total">
          <div class="total__title">总资产</div>
          <div class="total__amount">999</div>
        </div>
        <div class="statistics">
          <div class="statistics__count">
            <div class="statistics__count__amount">681</div>
            <div class="statistics__count__title">记账天数</div>
          </div>
          <div class="statistics__count">
            <div class="statistics__count__amount">1548</div>
            <div class="statistics__count__title">交易笔数</div>
          </div>
          <div class="statistics__count">
            <div class="statistics__count__amount">681</div>
            <div class="statistics__count__title">总支出</div>
          </div>
        </div>
      </Card>
    </div>
  </div>
  <Docker :currentIndex="2"></Docker>
</template>

<script lang="ts" setup>
import Circle from '../../components/Circle.vue';
import Docker from '../../components/Docker.vue';
import Card from '../../components/Card.vue';
</script>

<style lang="less" scoped>
.cardList {
  margin-top: 50px;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px 15px;

  &__title {
    font-weight: 700;
  }

  &__amount {
    font-size: 22px;
    font-weight: 700;
    color: #ff6c7a;
  }
}

.statistics {
  display: flex;
  padding: 5px 0;
  
  &__count {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      color: #999;
      font-size: 10px;
      margin-top: 5px;
    }

    &__amount {
      font-weight: 700;
      color: #333;
    }
  }
}
</style>

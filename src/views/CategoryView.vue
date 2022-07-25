<template>
  <Header title="分类" :showBack="true"></Header>
  <div class="main-content">
    <div class="add">
      <input type="text" class="add__input" />
      <var-button type="primary" round class="add__btn">
        <var-icon name="plus" />
      </var-button>
    </div>
    <Card :showHeader="false">
      <ListItem v-for="item in categrouyList" :item="item" :showBtn="true">
        <var-icon name="menu" size="16" class="edit" />
        <var-icon name="delete" size="16" class="delete" />
      </ListItem>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import ListItem from '../components/ListItem.vue';

const categrouyList = [
  { id: 0, title: '购物', desc: '共10条交易' },
  { id: 1, title: '水电费', desc: '共100条交易' },
  { id: 2, title: '交通', desc: '共99条交易' }
];
</script>

<style lang="less" scoped>
@import '../style/variables.less';
.main-content {
  top: 50px;
  bottom: 0;
}
.header {
  padding: 0 25px;
  background-image: @linearColor;
}

.edit {
  margin-right: 10px;
}

.add {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__input {
    flex: 1;
    margin: 0 10px 0 0;
    height: 30px;
    border-radius: 16px;
    border: none;
    outline: none;
    padding: 0 15px;
    font-size: 14px;
  }

  &__btn {
    background-color: @themeColor;
  }
}
</style>

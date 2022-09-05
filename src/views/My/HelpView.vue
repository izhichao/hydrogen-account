<template>
  <Header title="帮助" :back="true"></Header>
  <div class="main-content">
    <div class="card-list">
      <Card :header="false">
        <var-collapse v-model="active" :offset="false" class="help">
          <var-collapse-item v-for="item in helpList" :title="item.title">
            {{ item.text }}
          </var-collapse-item>
        </var-collapse>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '../components/Header.vue';
import Card from '../components/Card.vue';
import { ref } from 'vue';
const active = ref(['']);
const helpList = [
  { title: '标题1', text: '文本1' },
  { title: '标题2', text: '文本2' },
  { title: '标题3', text: '文本3' }
];
</script>

<style lang="less" scoped>
@import '../../style/variables.less';
@import '../../style/inner.less';

.help {
  --collapse-text-color: #333;
  --collapse-header-font-size: 14px;

  :deep(.var-collapse-item__header-title) {
    font-weight: 700;
  }
}
</style>

<template>
  <Card :title="title">
    <ul class="list">
      <ListItem v-for="item in list" :key="item.id" :item="item"></ListItem>
    </ul>
  </Card>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import Card from './Card.vue';
import ListItem from './ListItem.vue';
export interface Deal {
  id: number;
  title: string;
  desc?: string;
  amount: number;
}

defineProps({
  title: {
    type: String,
    required: true
  },
  list: {
    type: Array as PropType<Deal[]>,
    required: true
  }
});
</script>

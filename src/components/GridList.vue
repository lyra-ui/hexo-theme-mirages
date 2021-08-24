<template>
  <div class="grid-list mt-12 pl-4 pr-4">
    <h3 class="pb-2.5 text-3xl font-light">{{ title }}</h3>
    <div class="flex flex-wrap justify-start items-center">
      <span
        class="
          grid-item
          relative
          trans-300-ease-all
          text-base
          m-1
          pt-2.5
          pb-2.5
          pr-4
          pl-4
          rounded-full
          cursor-pointer
          select-none
        "
        v-for="item in items"
        :class="{ 'grid-item-active': currentItem === item.name }"
        :key="item.name"
        @click="itemClick(item)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { GridItem } from '@/models/Article.class'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default() {
        return []
      }
    },
    currentItem: {
      type: String,
      default: ''
    }
  },
  emits: ['itemClick'],
  setup(props, { emit }) {
    const itemClick = (item: GridItem) => {
      emit('itemClick', item)
    }
    return {
      itemClick
    }
  }
})
</script>

<style lang="scss" scoped>
.grid-list {
  color: var(--text-grid);
  .grid-item {
    background: transparent;
    &:hover {
      background: var(--background-grid-item);
    }
  }
  .grid-item-active {
    background: var(--background-grid-item);
  }
}
</style>

<template>
  <div class="pagination flex flex-nowrap justify-between item-center pb-4">
    <div
      class="pre trans-300-ease-all ml-4 md:ml-8 lg:ml-14"
      v-if="currentPage > 1"
      @click="pageChangeEmiiter(currentPage - 1)"
    >
      上一页
    </div>
    <div class="flex-grow text-center text-xs">
      <span class="cursor-pointer p-2">
        {{ currentPage }}
        <template v-if="currentPage !== totalPage">/ {{ totalPage }}</template>
      </span>
    </div>
    <div
      class="next trans-300-ease-all mr-4 md:mr-8 lg:mr-14"
      v-if="currentPage < pages"
      @click="pageChangeEmiiter(currentPage + 1)"
    >
      下一页
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    }
  },
  emits: ['pageChange'],
  setup(props, { emit }) {
    const pagination = toRefs(props)

    const pageChangeEmiiter = (page: number) => {
      emit('pageChange', page)
    }

    const pages = computed(() => {
      return Math.ceil(pagination.totalPage.value / pagination.pageSize.value)
    })
    return {
      currentPage: computed(() => pagination.current.value),
      pageChangeEmiiter,
      pages
    }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  color: var(--text-normal);
}
.pre,
.next {
  @apply cursor-pointer select-none;
  color: var(--text-button);
  background: var(--background-nomal);
  padding: 0.5625rem 2.8125rem;
  border-radius: 100rem;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5;
  &:hover {
    color: var(--background-nomal);
    background: var(--text-button);
  }
  border: {
    width: 0.0625rem;
    style: solid;
  }
}
</style>

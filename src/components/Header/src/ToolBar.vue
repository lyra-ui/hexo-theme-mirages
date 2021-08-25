<template>
  <div class="flex">
    <div class="flex rounded-full mr-1 ml-1 items-center tool-search-box p-0">
      <div
        class="
          tool-icon
          h-10
          w-10
          leading-10
          text-center
          rounded-full
          cursor-pointer
          trans-300-ease-all
        "
        @click="toggleSearch"
      >
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
      <input
        class="
          trans-300-ease-all
          p-0
          w-0
          border-none
          h-3/6
          bg-transparent
          text-sm
        "
        :class="{ search: searchReady }"
        type="text"
        placeholder="搜索..."
        v-model="searchKey"
      />
    </div>
    <div></div>
    <div
      class="
        read-set
        relative
        tool-icon
        trans-300-ease-all
        mr-1
        ml-1
        h-10
        w-10
        leading-10
        rounded-full
        text-center
        cursor-pointer
      "
    >
      <i class="fa fa-font" aria-hidden="true"></i>
      <div class="absolute -right-4 top-full" style="width: 17.5rem">
        <div>
          <div class="flex text-center text-sm pt-1 pb-1">
            <div class=" w-10 h-10 leading-10">
              <i class="fa fa-adjust"></i>
            </div>
            <div class="w-10 h-10 leading-10"></div>
            <div class="w-10 h-10 leading-10"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const searchReady = ref(false)
    const searchKey = ref('')
    const toggleSearch = () => {
      if (searchReady.value) {
        searchKey.value = ''
      }
      searchReady.value = !searchReady.value
    }
    const mousedown = (e: MouseEvent) => {
      console.log(e.target)
    }
    return {
      searchReady,
      searchKey,
      toggleSearch,
      mousedown
    }
  }
})
</script>

<style lang="scss" scoped>
.tool-search-box {
  background: var(--background-tool-bar);
  color: var(--text-tool-bar);
  input {
    outline: none;
    color: inherit;
  }
}
.search {
  width: 7rem;
}
.tool-icon {
  background: var(--background-tool-bar);
  color: var(--text-tool-bar);
  &:hover {
    background: var(--text-tool-bar);
    color: var(--background-tool-bar);
  }
}

.read-set {
  &::after {
    @apply absolute top-full left-0;
    content: '';
    margin-left: .8125rem;
    margin-top: -.4rem;
    border: 0.4375rem solid transparent;
    border-bottom-color: #191919;
  }
}
.tool-active {
  background-color: #fc3 !important;
}
</style>

<template>
  <div class="flex">
    <div class="flex rounded-full mr-1 ml-1 items-center tool-search-box p-0">
      <div class="tool-icon trans-300-ease-all" @click="toggleSearch">
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
    <div class="read-setting-button">
      <div class="tool-icon trans-300-ease-all">
        <i class="fa fa-font" aria-hidden="true"></i>
      </div>
      <!-- <div class="read-setting-container" style="width: 17.5rem">
        <div class="read-setting">
          <div class="read-setting-font">
            <div class="font-smaller">
              <i class="fa fa-font"></i>
            </div>
            <div class="font-percentage">
              100%
            </div>
            <div class="font-larger">
              <i class="fa fa-font"></i>
            </div>
          </div>
          <div class="read-setting-theme">
            <div class="theme-common">
              <i class="fa fa-adjust"></i>
            </div>
            <div class="light-theme"></div>
            <div class="dark-theme"></div>
          </div>
        </div>
      </div> -->
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
.theme-common {
  @apply w-10 h-10 leading-10 rounded-full;
  background: #f0f0f0;
}
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

.read-setting-button {
  @apply relative mr-1 ml-1;
  &::after {
    @apply absolute top-full left-0;
    content: '';
    margin-left: 0.8125rem;
    margin-top: -0.4rem;
    border: 0.4375rem solid transparent;
    border-bottom-color: #191919;
  }
}

.tool-icon {
  @apply h-10 w-10 leading-10 rounded-full text-center cursor-pointer;
  background: var(--background-tool-bar);
  color: var(--text-tool-bar);
  &:hover {
    background: var(--text-tool-bar);
    color: var(--background-tool-bar);
  }
}

.read-setting-container {
  @apply absolute -right-4 top-full rounded-md p-2 h-40;
  margin-top: 0.4375rem;
  background: #191919;
  .read-setting {
    @apply w-full h-full rounded-md;
    background: #131313;
    .read-setting-font {
      @apply flex items-center;
      div {
        @apply m-0 font-normal whitespace-nowrap align-middle border-0 border-none;
      }
      .font-smaller {
        @apply flex-grow cursor-pointer whitespace-nowrap;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      }
      .font-percentage {
        @apply w-1/5 h-8 cursor-text;
        font-size: 0.75rem;
      }
      .font-larger {
        @apply flex-grow;
      }
    }
    .read-setting-theme {
      @apply flex text-center text-sm pt-1 pb-1;
    }
  }
}
.tool-active {
  background-color: #fc3 !important;
}
.dark-theme {
  @extend .theme-common;
  background: #2c2a2a;
}
.light-theme {
  @extend .theme-common;
  background: #fafafa;
}
</style>

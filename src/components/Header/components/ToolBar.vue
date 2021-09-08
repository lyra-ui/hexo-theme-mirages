<template>
  <div class="flex">
    <div
      class="flex rounded-full mr-1 ml-1 items-center tool-search-box p-0"
      title="search"
    >
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
    <div
      class="tool-icon trans-300-ease-all mr-1 ml-1"
      v-if="toolbar.github.length > 0"
      title="github"
    >
      <a :href="toolbar.github">
        <i class="fa fa-github" aria-hidden="true"></i>
      </a>
    </div>
    <div
      class="tool-icon trans-300-ease-all mr-1 ml-1"
      v-if="toolbar.twitter.length > 0"
      title="twitter"
    >
      <a :href="toolbar.twitter">
        <i class="fa fa-twitter" aria-hidden="true"></i>
      </a>
    </div>
    <div
      class="tool-icon trans-300-ease-all mr-1 ml-1"
      v-if="toolbar.weibo.length > 0"
      title="weibo"
    >
      <a :href="toolbar.weibo">
        <i class="fa fa-weibo" aria-hidden="true"></i>
      </a>
    </div>
    <div class="tool-icon trans-300-ease-all mr-1 ml-1" @click="toggleTheme">
      <a v-if="theme === 'auto'">
        <i class="fa fa-adjust" aria-hidden="true"></i>
      </a>
      <a v-if="theme === 'theme-light'">
        <i class="fa fa-moon-o" aria-hidden="true"></i>
      </a>
      <a v-if="theme === 'theme-dark'">
        <i class="fa fa-sun-o" aria-hidden="true"></i>
      </a>
    </div>
    <div
      class="read-setting-button"
      style="display: none"
      :class="{ 'read-setting-actice': false }"
      v-if="false"
    >
      <div class="tool-icon trans-300-ease-all">
        <i class="fa fa-font" aria-hidden="true"></i>
      </div>
      <div class="read-setting-container" style="width: 17.5rem; display: none">
        <div class="read-setting">
          <div class="read-setting-font">
            <button class="font-smaller">
              <i class="fa fa-font"></i>
            </button>
            <button class="font-percentage">100%</button>
            <button class="font-larger">
              <i class="fa fa-font"></i>
            </button>
          </div>
          <div class="read-setting-theme">
            <div class="theme-common">
              <i class="fa fa-adjust"></i>
            </div>
            <div class="light-theme"></div>
            <div class="dark-theme"></div>
          </div>
          <div class="read-setting-family">
            <button class="select">Serif</button>
            <button>Sans Serif</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ToolBar',
  setup() {
    const appStore = useAppStore()
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

    const toggleTheme = () => {
      switch (appStore.theme) {
        case 'auto':
          appStore.toggleTheme('theme-light')
          break
        case 'theme-light':
          appStore.toggleTheme('theme-dark')
          break
        default:
          appStore.toggleTheme('auto')
          break
      }
    }
    return {
      searchReady,
      searchKey,
      toggleSearch,
      mousedown,
      toggleTheme,
      toolbar: computed(() => appStore.themeConfig.socials),
      theme: computed(() => appStore.theme)
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
  @apply relative ml-1;
}
.read-setting-actice {
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
  @apply absolute -right-4 top-full rounded-md p-2;
  height: 10rem;
  margin-top: 0.4375rem;
  background: #191919;
  .read-setting {
    @apply w-full h-full rounded-md;
    background: #131313;
    .read-setting-font {
      @apply flex items-center;
      height: 3.3rem;
      line-height: 3.3rem;
      button {
        color: white;
        @apply m-0 font-normal whitespace-nowrap align-middle border-0 border-none;
      }
      .font-smaller {
        @apply flex-grow cursor-pointer whitespace-nowrap bg-transparent;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
      }
      .font-percentage {
        @apply w-1/5 h-8 cursor-text;
        font-size: 0.75rem;
        background: #191919;
      }
      .font-larger {
        @apply flex-grow bg-transparent;
      }
    }
    .read-setting-theme {
      @apply flex text-center text-sm pt-1 pb-1 justify-center overflow-hidden;
      height: 3.3rem;
      line-height: 3.3rem;
      border-top: 0.0625rem solid white;
      border-bottom: 0.0625rem solid white;
      div {
        @apply mr-1 ml-1;
      }
    }
    .read-setting-family {
      height: 3.3rem;
      line-height: 3.3rem;
      width: 100%;
      button {
        @apply inline-block m-0 text-sm font-normal text-center whitespace-nowrap align-middle cursor-pointer border-0 select-none;
        width: calc(50% - 0.3125rem);
        line-height: 1.1rem;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 400;
        border-radius: 0.3125rem;
        color: #bcbcbc;
        background-color: #131313;
        transition: 0.3s ease background-color;
        &.select {
          background-color: #fc3 !important;
          border-radius: 0.3125rem !important;
          color: #fff !important;
          z-index: 1;
        }
      }
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

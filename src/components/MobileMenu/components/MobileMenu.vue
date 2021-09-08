<template>
  <header class="block md:hidden">
    <!-- Toggle Menu -->
    <div
      id="toggle-menu"
      class="trans-500-ease-all"
      :class="{ 'show-sidebar': isActive, active: isActive }"
      @click="toggleHandler"
    >
      <span>MENU</span>
    </div>
    <!-- Menu Container -->
    <div
      id="mobile-navigator"
      class="fixed top-0 bottom-0 trans-500-ease-all"
      style="z-index: 899"
      :class="{ 'show-sidebar': isActive }"
    >
      <!-- Menu Navigator -->
      <div id="mobile-menu" class="trans-500-ease-all">
        <!-- Avator -->
        <div class="mobile-avator relative pt-10 pb-10 text-center">
          <a href="/about">
            <img
              class="w-24 h-24 rounded-full overflow-hidden"
              :src="author.avator"
              alt=""
            />
          </a>
        </div>
        <!-- Search Box -->
        <div class="search-box relative">
          <div class="p-4 pr-7 search-input-box">
            <input type="text" class="search-input" placeholder="搜索..." />
          </div>
          <div
            class="
              absolute
              top-0
              right-1
              bottom-0
              flex
              justify-center
              items-center
            "
          >
            <button>
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <!-- Navigator -->
        <ul class="mobile-navigator relative">
          <li><div @click="pushHandler('/')">首页</div></li>
          <li v-for="route in routes" :key="route.name">
            <div @click="pushHandler(route.path)">{{ route.name }}</div>
          </li>
        </ul>
      </div>
      <!-- Menu Toolbar -->
      <div id="menu-toolbar" class="trans-500-ease-all">
        <div class="toolbar-static flex items-center h-full justify-center">
          <div class="tool-icon trans-300-ease-all" v-if="rss.enable">
            <i class="fa fa-rss" aria-hidden="true"></i>
          </div>
          <div
            class="tool-icon trans-300-ease-all"
            v-if="toolbar.github && toolbar.github.length > 0"
          >
            <a :href="toolbar.github">
              <i class="fa fa-github" aria-hidden="true"></i>
            </a>
          </div>
          <div class="tool-icon trans-300-ease-all">
            <a :href="toolbar.twitter">
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
          </div>
          <div class="tool-icon trans-300-ease-all">
            <a :href="toolbar.weibo">
              <i class="fa fa-weibo" aria-hidden="true"></i>
            </a>
          </div>
          <div class="tool-icon trans-300-ease-all" @click="toggleTheme">
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
        </div>
        <div class="toolbar-custom flex"></div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent } from 'vue'
import useMixin from '@/utils/mixin'

export default defineComponent({
  props: {
    isActive: Boolean
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const { pushPage } = useMixin()
    const appStore = useAppStore()
    const toggleHandler = () => {
      emit('toggle')
    }
    const pushHandler = (path: string) => {
      toggleHandler()
      pushPage(path)
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
      routes: computed(() => appStore.themeConfig.menu.menus),
      author: computed(() => appStore.themeConfig.author),
      toolbar: computed(() => appStore.themeConfig.socials),
      rss: computed(() => appStore.themeConfig.rss),
      theme: computed(() => appStore.theme),
      toggleHandler,
      pushHandler,
      toggleTheme
    }
  }
})
</script>

<style lang="scss" scoped>
#mobile-menu {
  position: absolute;
  top: 0;
  left: -17.5rem;
  bottom: 0;
  width: 17.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 6.25rem;
  color: var(--text-mobile);
  background: var(--background-mobile);
}

.mobile-avator {
  img {
    box-shadow: 0 0 1rem 0.03125rem rgb(0 0 0 / 12%);
  }
}

#toggle-menu {
  @apply fixed top-2.5 left-2.5 text-xs cursor-pointer select-none rounded-full font-light;
  z-index: 999;
  padding: 0.125rem 1.25rem;
  color: var(--text-normal);
  line-height: 1.875rem;
  background: var(--background-nomal);
  border-width: 0.0625rem;
  border-style: solid;
  border-color: var(--text-normal);
  &.active {
    color: var(--background-nomal);
    background: var(--text-normal);
  }
}

#menu-toolbar {
  @apply fixed bottom-0 overflow-hidden;
  left: -17.5rem;
  width: 17.5rem;
  transition: all 0.3s linear;
  background: var(--background-mobile-deep);
  box-shadow: 0 -0.3125rem 0.3125rem -0.3125rem rgb(0 0 0 / 12%);
}
.show-sidebar {
  #mobile-menu {
    border-right: 0.0625rem solid var(--mobile-border);
  }
}
.toolbar-static {
  height: 3.625rem;
}
.search-box {
  .search-input-box {
    background: var(--background-mobile-deep) no-repeat 90%;
  }
  .search-input {
    padding: 0;
    width: 100%;
    background: transparent;
    border: none;
    color: #1abc9c;
    font-size: 1rem;
    line-height: 1.3em;
    text-align: center;
  }
  button {
    color: var(--text-mobile-navigator);
    background: transparent;
  }
}

input {
  outline: none;
  color: inherit;
}

ul {
  @apply flex flex-col pl-0 mb-0 flex-wrap;
  list-style: none;
  li {
    list-style: none;
    padding: 0;
    div {
      padding: 0.375rem 1.75rem;
      position: relative;
      line-height: 2.25rem;
      color: var(--text-mobile-navigator);
      display: block;
      font-size: 1.25rem;
      text-align: center;
      font-weight: 300;
    }
  }
}

.tool-icon {
  @apply h-10 w-10 leading-10 rounded-full text-center cursor-pointer;
  margin: 0 0.25rem;
  background: var(--background-tool-bar);
  color: var(--text-tool-bar);
  &:hover {
    background: var(--text-tool-bar);
    color: var(--background-tool-bar);
  }
}
</style>

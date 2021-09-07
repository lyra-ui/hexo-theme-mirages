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
          <input type="text" class="search-input" placeholder="搜索..." />
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
          <li><div>首页</div></li>
          <li v-for="route in routes" :key="route.name">
            <div>{{ route.name }}</div>
          </li>
        </ul>
      </div>
      <!-- Menu Toolbar -->
      <div
        id="menu-toolbar"
        class="trans-500-ease-all"
        style="background-color: #131313"
      >
        <div class="toolbar-static flex items-center h-full justify-center">
          <div class="tool-icon trans-300-ease-all">
            <i class="fa fa-font" aria-hidden="true"></i>
          </div>
          <div class="tool-icon trans-300-ease-all">
            <i class="fa fa-font" aria-hidden="true"></i>
          </div>
          <div class="tool-icon trans-300-ease-all">
            <i class="fa fa-font" aria-hidden="true"></i>
          </div>
          <div class="tool-icon trans-300-ease-all">
            <i class="fa fa-font" aria-hidden="true"></i>
          </div>
          <div class="tool-icon trans-300-ease-all">
            <i class="fa fa-font" aria-hidden="true"></i>
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

export default defineComponent({
  props: {
    isActive: Boolean
  },
  emits: ['toggle'],
  components: {
    Navigator
  },
  setup(props, { emit }) {
    const appStore = useAppStore()
    const toggleHandler = () => {
      emit('toggle')
    }
    return {
      routes: computed(() => appStore.themeConfig.menu.menus),
      author: computed(() => appStore.themeConfig.author),
      toolbar: computed(() => appStore.themeConfig.socials),
      toggleHandler
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
}

.theme-light {
  #mobile-menu,
  #menu-toolbar {
    border-right: 0.0625rem solid #efefef;
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
}
.toolbar-static {
  height: 3.625rem;
}
.search-box {
  .search-input {
    padding: 0;
    width: 100%;
    background: #131313 no-repeat 90%;
    border: none;
    color: #1abc9c;
    font-size: 1rem;
    line-height: 1.3em;
    text-align: center;
  }
  button {
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
      color: #9ba3ad;
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

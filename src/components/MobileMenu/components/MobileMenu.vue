<template>
  <header>
    <div
      id="toggle-menu"
      class="trans-500-ease-all"
      :class="{ 'show-sidebar': isActive }"
      @click="$emit('toggle')"
    >
      menu
    </div>
    <div
      id="mobile-menu"
      class="block md:hidden trans-500-ease-all"
      :class="{ 'show-sidebar': isActive }"
    >
      <Navigator />
      <TooBar />
    </div>
  </header>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent } from 'vue'
import Navigator from './Navigator.vue'
import TooBar from './ToolBar.vue'

export default defineComponent({
  props: {
    isActive: Boolean
  },
  emits: ['toggle'],
  components: {
    Navigator,
    TooBar
  },
  setup() {
    const appStore = useAppStore()

    return {
      routes: computed(() => appStore.themeConfig.menu.menus),
      author: computed(() => appStore.themeConfig.author),
      toolbar: computed(() => appStore.themeConfig.socials)
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
  overflow: hidden;
}
.nav {
  z-index: 888;
}
#toggle-menu {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 899;
}
</style>

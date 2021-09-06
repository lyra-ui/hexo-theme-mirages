<template>
  <div>Navigator</div>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const appStore = useAppStore()
    return {
      routes: computed(() => appStore.themeConfig.menu.menus)
    }
  }
})
</script>

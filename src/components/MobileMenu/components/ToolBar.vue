<template>
  <div>ToolBar</div>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const appStore = useAppStore()
    return {
      socials: computed(() => appStore.themeConfig.socials)
    }
  }
})
</script>

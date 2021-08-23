<template>
  <div id="logo" class="mr-4 cursor-pointer overflow-hidden">
    <span class="w-full text-xl leading-normal pt-1 pb-1 font-bold">{{ logo }}LOGO</span>
  </div>
</template>
<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const appStore = useAppStore()
    return {
      logo: computed(() => appStore.themeConfig.site.logo)
    }
  }
})
</script>

<style lang="scss" scoped>
#logo {
  max-width: 180px;
  color: var(--text-highlight);
}
</style>

<template>
  <div
    id="logo"
    class="mr-4 cursor-pointer overflow-hidden"
    @click="pushPage('/')"
  >
    <span class="w-full text-xl leading-normal pt-1 pb-1 font-bold">
      {{ logo }}
    </span>
  </div>
</template>
<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent } from 'vue'
import useMixin from '@/utils/mixin'

export default defineComponent({
  setup() {
    const appStore = useAppStore()
    const { pushPage } = useMixin()
    return {
      logo: computed(() => appStore.themeConfig.site.logo),
      pushPage
    }
  }
})
</script>

<style lang="scss" scoped>
#logo {
  max-width: 180px;
  color: var(--text-logo);
}
</style>

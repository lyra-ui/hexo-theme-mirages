<template>
  <a
    :href="href"
    v-if="text"
    class="lyra-link relative cursor-pointer no-underline"
    :style="customStyle"
  >
    {{ text }}
  </a>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    href: String,
    text: String
  },
  setup() {
    const appStore = useAppStore()
    return {
      customStyle: computed(() => {
        const mainColor = appStore.themeConfig.theme_preset.main_color
          ? appStore.themeConfig.theme_preset.main_color
          : '#1abc9c'
        return `color: ${mainColor}`
      })
    }
  }
})
</script>

<style lang="scss" scoped>
a.lyra-link {
  color: #f55852;
  &:hover::after {
    left: 0;
    width: 100%;
    transition: width 350ms;
  }
  &::after {
    @apply absolute;
    bottom: -0.0625rem;
    left: 100%;
    width: 0;
    border-bottom: {
      width: 0.0625rem;
      style: solid;
    }
    content: '';
    transition: width 350ms, left 350ms;
  }
}
</style>

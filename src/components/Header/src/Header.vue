<template>
  <div
    class="
      lr-navigator
      w-full
      pr-3
      pl-3
      pt-4
      pb-4
      fixed
      left-0
      top-0
      right-0
      z-40
      sm:hidden
      mb:block
    "
  >
    <div
      class="
        flex
        justify-between
        items-center
        w-full
        m-auto
        md:max-w-2xl
        lg:max-w-4xl
        xl:max-w-5xl
        2xl:max-w-6xl
      "
    >
      <Logo />
      <div class="flex flex-grow justify-between items-center">
        <Navigator />
        <ToolBar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/app'
import Logo from './Logo.vue'
import Navigator from './Navigator.vue'
import ToolBar from './ToolBar.vue'

export default defineComponent({
  components: {
    Logo,
    Navigator,
    ToolBar
  },
  setup() {
    const appStore = useAppStore()
    return {}
  }
})
</script>

<style lang="scss" scoped>
.lr-navigator {
  background: var(--backgroud-comp-head);
  color: var(--text-normal);
  box-shadow: 0 0.3125rem 0.3125rem -0.3125rem rgb(0 0 0 / 12%);
}
</style>

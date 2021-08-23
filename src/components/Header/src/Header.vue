<template>
  <div
    class="
      lr-navigator
      pt-3
      pb-3
      pr-4
      pl-4
      fixed
      -left-2
      top-0
      -right-2
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
import Logo from './Logo.vue'
import Navigator from './Navigator.vue'
import ToolBar from './ToolBar.vue'

export default defineComponent({
  components: {
    Logo,
    Navigator,
    ToolBar
  }
})
</script>

<style lang="scss" scoped>
.lr-navigator {
  backdrop-filter: blur(20px);
  background: var(--background-main-head);
  color: var(--text-normal);
  box-shadow: 0 0.3125rem 0.3125rem -0.3125rem rgb(0 0 0 / 12%);
}
</style>

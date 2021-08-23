<template>
  <div class="flex">
    <div class="flex">
      <div
        class="
          tool-icon
          mr-1
          ml-1
          h-10
          w-10
          leading-10
          text-center
          rounded-full
          cursor-pointer
          trans-300-ease-all
        "
      >
        <i class="fa fa-search" aria-hidden="true"></i>
      </div>
    </div>
    <div></div>
    <div
      class="
        tool-icon
        trans-300-ease-all
        mr-1
        ml-1
        h-10
        w-10
        leading-10
        rounded-full
        text-center
        cursor-pointer
      "
    >
      <i class="fa fa-font" aria-hidden="true"></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolBar'
})
</script>

<style lang="scss" scoped>
.tool-icon {
  background: var(--background-tool-bar);
  color: var(--text-tool-bar);
  &:hover {
    background: var(--text-tool-bar);
    color: var(--background-tool-bar);
  }
}
</style>

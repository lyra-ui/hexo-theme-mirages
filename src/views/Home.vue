<template>
  <div class="w-full">
    <div
      class="
        m-auto
        w-full
        h-screen
        md:max-w-3xl
        lg:max-w-4xl
        xl:max-w-5xl
        2xl:max-w-7xl
        trans-500-ease-all
      "
      style="background: red"
    >
      <div
        class="
          h-screen
          mr-4
          ml-4
          md:mr-8
          md:ml-8
          lg:mr-16
          lg:ml-16
          xl:mr-32
          xl:ml-32
          trans-500-ease-all
        "
        style="background: pink"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {}
})
</script>

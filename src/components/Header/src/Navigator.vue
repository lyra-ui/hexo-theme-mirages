<template>
  <div class="flex justify-start items-center flex-grow">
    <div
      class="navi-item trans-300-ease-all mr-1 ml-1 cursor-pointer p-2"
      v-for="route in routes"
      :key="route.name"
      @click="pushPage(route.path)"
    >
      {{ route.name }}
    </div>
  </div>
</template>

<script lang="ts">
import useMixin from '@/utils/mixin'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const { pushPage } = useMixin()
    const defaultRoutes = [
      {
        name: '分类',
        path: '/categories',
        enable: true
      },
      {
        name: '归档',
        path: '/archives',
        enable: true
      },
      {
        name: '标签',
        path: '/tags',
        enable: true
      },
      {
        name: '关于',
        path: '/about',
        enable: true
      }
    ]
    return {
      routes: computed(() => {
        return defaultRoutes
      }),
      pushPage
    }
  }
})
</script>

<style lang="scss" scoped>
.navi-item {
  color: var(--text-normal);
  &:hover {
    color: var(--text-normal-hover);
  }
}
</style>

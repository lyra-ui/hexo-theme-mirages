<template>
  <div class="flex justify-start items-center flex-grow">
    <div
      class="mr-1 ml-1 cursor-pointer p-2"
      v-for="route in routes"
      :key="route.name"
      @click="pushPage(route.path)"
    >
      {{ route.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import useMixin from '@/utils/mixin'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const appStore = useAppStore()
    const { pushPage } = useMixin()
    const defaultRoutes = [
      {
        name: 'Category',
        path: '/categories'
      },
      {
        name: 'Archives',
        path: '/archives'
      },
      {
        name: 'About',
        path: '/about'
      }
    ]

    return {
      routes: computed(() => {
        return defaultRoutes.concat(appStore.themeConfig.custom_menus.menus)
      }),
      pushPage
    }
  }
})
</script>

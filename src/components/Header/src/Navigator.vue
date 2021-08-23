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
import { isExternal } from '@/utils'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const appStore = useAppStore()
    const router = useRouter()
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
    const pushPage = (path: string) => {
      if (isExternal(path)) {
        window.open(path)
      } else {
        router.push({
          path: path
        })
      }
    }
    return {
      routes: computed(() => {
        return defaultRoutes.concat(appStore.themeConfig.custom_menus.menus)
      }),
      pushPage
    }
  }
})
</script>

<template>
  <div class="w-full">
    <PageCover :data="cover" />
    <div class="relative w-full">
      <div
        class="
          w-full
          m-auto
          overflow-hidden
          md:max-w-2xl
          lg:max-w-4xl
          xl:max-w-5xl
          2xl:max-w-6xl
        "
      >
        <div class="post-html" v-html="pageData.content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Page } from '@/models/Article.class'
import { useAppStore } from '@/store/app'
import { usePageStore } from '@/store/page'
import { randomValue } from '@/utils'
import { defineComponent, onBeforeMount, ref } from 'vue'
import PageCover from '@/components/PageCover.vue'

export default defineComponent({
  components: {
    PageCover
  },
  setup() {
    const appStore = useAppStore()
    const pageStore = usePageStore()
    const pageData = ref(new Page())
    const fecthData = () => {
      pageStore.fetchPage('about').then(res => {
        pageData.value = res
      })
    }

    onBeforeMount(fecthData)
    return {
      cover: {
        background: randomValue(appStore.themeConfig.pictures),
        title: 'About'
      },
      pageData
    }
  }
})
</script>

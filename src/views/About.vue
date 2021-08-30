<template>
  <div class="w-full">
    <PageCover :data="cover" type="about" />
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
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
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
    const cover = computed(() => {
      const background =
        pageData.value.cover.length > 0
          ? pageData.value.cover
          : randomValue(appStore.themeConfig.pictures)
      const avator =
        appStore.themeConfig.author.avator.length > 0
          ? appStore.themeConfig.author.avator
          : 'https://z3.ax1x.com/2021/08/30/hNY8xS.jpg'
      const title =
        appStore.themeConfig.author.name.length > 0
          ? appStore.themeConfig.author.name
          : 'About'
      return {
        title,
        background,
        avator
      }
    })

    onBeforeMount(fecthData)
    return {
      cover,
      pageData
    }
  }
})
</script>

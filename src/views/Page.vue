<template>
  <div class="w-full">
    <PageCover :data="pageData" />
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
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import PageCover from '@/components/PageCover.vue'
import { useRoute } from 'vue-router'
import { usePageStore } from '@/store/page'
import { Page } from '@/models/Article.class'
import { randomValue } from '@/utils'
import { useAppStore } from '@/store/app'
export default defineComponent({
  components: {
    PageCover
  },
  setup() {
    const appStore = useAppStore()
    const pageStore = usePageStore()
    const route = useRoute()
    let slug = String(route.params.slug)
    const pageData = ref(new Page())
    const fetchPage = () => {
      pageStore.fetchPage(slug).then(res => {
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
    onBeforeMount(fetchPage)

    return {
      pageData,
      cover
    }
  }
})
</script>

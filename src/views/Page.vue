<template>
  <div class="w-full">
    <PageCover :data="cover" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
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
    const pageDate = ref(new Page())
    const fetchPage = () => {
      pageStore.fetchPage(slug).then(res => {
        pageDate.value = res
      })
    }

    onBeforeMount(fetchPage)

    return {
      pageDate,
      cover: {
        background: randomValue(appStore.themeConfig.pictures),
        title: slug
      }
    }
  }
})
</script>

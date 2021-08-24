<template>
  <div class="w-full">
    <PageCover :data="cover" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import PageCover from '@/components/PageCover.vue'
import { useSpecificlistStore } from '@/store/specificlist'
import { useRoute } from 'vue-router'
import { PostList } from '@/models/Article.class'
import { randomValue } from '@/utils'
import { useAppStore } from '@/store/app'
export default defineComponent({
  components: {
    PageCover
  },
  setup() {
    const appStore = useAppStore()
    const specificlistStore = useSpecificlistStore()
    const route = useRoute()
    const postlist = ref(new PostList().posts)

    let slug = String(route.params.slug)
    const fetchPostsList = async () => {
      await specificlistStore.fecthCategory(slug).then(() => {
        postlist.value = specificlistStore.specificlist.postlist
      })
    }
    onMounted(fetchPostsList)
    return {
      postlist,
      cover: computed(() => {
        return {
          background: randomValue(appStore.themeConfig.pictures),
          title: slug
        }
      })
    }
  }
})
</script>

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
        <ArticleCard
          v-for="post in postlist"
          :key="post.name"
          :post="post"
          @postClick="pushPage(`/post/${post.slug}`)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { randomValue } from '@/utils'
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageCover from '@/components/PageCover.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useSpecificlistStore } from '@/store/specificlist'
import { PostList } from '@/models/Article.class'
import useMixin from '@/utils/mixin'
export default defineComponent({
  components: {
    PageCover,
    ArticleCard
  },
  setup() {
    const appStore = useAppStore()
    const specificlistStore = useSpecificlistStore()
    const route = useRoute()
    const { pushPage } = useMixin()
    let slug = String(route.params.slug)
    const postlist = ref(new PostList().posts)

    const cover = computed(() => {
      return {
        background: randomValue(appStore.themeConfig.pictures),
        title: slug
      }
    })

    const fetchData = () => {
      specificlistStore.fecthTag(slug).then(() => {
        postlist.value = specificlistStore.specificlist.postlist
      })
    }
    onBeforeMount(fetchData)

    return {
      cover,
      postlist,
      pushPage
    }
  }
})
</script>

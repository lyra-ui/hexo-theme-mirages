<template>
  <div class="w-full">
    <PageCover :data="site" />
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
          v-for="post in postlist.posts"
          :key="post.name"
          :post="post"
          @postClick="pushPage(`/post/${post.slug}`)"
        />
        <Paginator
          :totalPage="pagination.totalPage"
          :pageSize="pagination.pageSize"
          :current="pagination.current"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PostList } from '@/models/Article.class'
import { useAppStore } from '@/store/app'
import { usePostStore } from '@/store/post'
import { computed, defineComponent, onMounted, ref } from 'vue'
import useMixin from '@/utils/mixin'
import ArticleCard from '@/components/ArticleCard.vue'
import PageCover from '@/components/PageCover.vue'
import Paginator from '@/components/Paginator.vue'

export default defineComponent({
  name: 'Home',
  components: {
    ArticleCard,
    PageCover,
    Paginator
  },
  setup() {
    const appStore = useAppStore()
    const postStore = usePostStore()
    const postlist = ref(new PostList())
    const pagination = ref({
      pageSize: 10,
      totalPage: 1,
      current: 1
    })
    const { pushPage } = useMixin()
    const fectchPosts = async () => {
      await postStore.fetchPostsList().then(() => {
        postlist.value = postStore.posts
        pagination.value.totalPage = postStore.posts.total_pages
        pagination.value.pageSize = postStore.posts.page_size
      })
    }
    const fetchData = async () => {
      await fectchPosts()
    }

    onMounted(fetchData)
    return {
      postlist,
      pushPage,
      pagination,
      site: computed(() => appStore.themeConfig.site.pageCover())
    }
  }
})
</script>

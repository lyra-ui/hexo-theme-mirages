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
        <GridList
          title="全部类别"
          :items="gridlist"
          :currentItem="currentCategory"
          @itemClick="changeCategory"
        />
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
import { computed, defineComponent, onMounted, ref } from 'vue'
import PageCover from '@/components/PageCover.vue'
import GridList from '@/components/GridList.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import { useSpecificlistStore } from '@/store/specificlist'
import { GridItem, PostList } from '@/models/Article.class'
import { randomValue } from '@/utils'
import { useAppStore } from '@/store/app'
import useMixin from '@/utils/mixin'

export default defineComponent({
  components: {
    PageCover,
    GridList,
    ArticleCard
  },
  setup() {
    const appStore = useAppStore()
    const specificlistStore = useSpecificlistStore()
    const postlist = ref(new PostList().posts)
    const currentCategory = ref('')
    const { pushPage } = useMixin()
    const fetchAllCategories = async () => {
      await specificlistStore.fetchCategories().then(async () => {
        if (specificlistStore.categories.length > 0) {
          const slug = specificlistStore.categories[0].slug
          currentCategory.value = specificlistStore.categories[0].name
          await fetchPostsList(slug)
        }
      })
    }

    const changeCategory = async (item: GridItem) => {
      currentCategory.value = item.name
      await specificlistStore.fecthCategory(item.slug).then(() => {
        postlist.value = specificlistStore.specificlist.postlist
      })
    }
    const fetchPostsList = async (slug: string) => {
      await specificlistStore.fecthCategory(slug).then(() => {
        postlist.value = specificlistStore.specificlist.postlist
      })
    }
    onMounted(fetchAllCategories)
    return {
      postlist,
      gridlist: computed(() => specificlistStore.categories),
      cover: {
        background: randomValue(appStore.themeConfig.pictures),
        title: '分类'
      },
      currentCategory,
      changeCategory,
      pushPage
    }
  }
})
</script>

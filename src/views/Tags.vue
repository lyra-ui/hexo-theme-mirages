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
          title="全部标签"
          :items="gridlist"
          :currentItem="currentTag"
          @itemClick="changeTag"
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

export default defineComponent({
  components: {
    PageCover,
    GridList,
    ArticleCard
  },
  setup() {
    const appStore = useAppStore()
    const specificlistStore = useSpecificlistStore()
    const currentTag = ref('')
    const postlist = ref(new PostList().posts)
    const changeTag = async (item: GridItem) => {
      currentTag.value = item.name
      await specificlistStore.fecthTag(item.slug).then(() => {
        postlist.value = specificlistStore.specificlist.postlist
      })
    }

    const fetchData = async () => {
      await specificlistStore.fetchAllTags().then(() => {
        postlist.value = specificlistStore.specificlist.postlist
      })
    }

    onMounted(fetchData)

    return {
      cover: {
        background: randomValue(appStore.themeConfig.pictures),
        title: '标签'
      },
      gridlist: computed(() => specificlistStore.tags),
      changeTag,
      currentTag,
      postlist
    }
  }
})
</script>

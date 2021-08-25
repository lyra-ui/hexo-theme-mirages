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
        <GridList title="标签云" :items="gridlist" @itemClick="pushTagPage" />
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
import { computed, defineComponent, ref } from 'vue'
import PageCover from '@/components/PageCover.vue'
import GridList from '@/components/GridList.vue'
import { randomValue } from '@/utils'
import { useAppStore } from '@/store/app'
import { useSpecificlistStore } from '@/store/specificlist'
import { GridItem, PostList } from '@/models/Article.class'
import useMinin from '@/utils/mixin'

export default defineComponent({
  components: {
    PageCover,
    GridList
  },
  setup() {
    const appStore = useAppStore()
    const specificlistStore = useSpecificlistStore()
    const postlist = ref(new PostList().posts)
    const { pushPage } = useMinin()
    const pushTagPage = (item: GridItem) => {
      pushPage(`/tag/${item.slug}`)
    }
    return {
      cover: {
        background: randomValue(appStore.themeConfig.pictures),
        title: '归档'
      },
      postlist,
      gridlist: computed(() => specificlistStore.tags),
      pushTagPage
    }
  }
})
</script>

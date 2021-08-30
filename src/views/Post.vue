<template>
  <div class="w-full">
    <PageCover :data="postData" type="post" />
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
        <div class="post-html" v-html="postData.content"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import PageCover from '@/components/PageCover.vue'
import { usePostStore } from '@/store/post'
import { Post } from '@/models/Article.class'
import { useRoute } from 'vue-router'
declare const Prism: any
export default defineComponent({
  components: {
    PageCover
  },
  setup() {
    const postStore = usePostStore()
    const postData = ref(new Post())
    const route = useRoute()

    const slug = String(route.params.slug)

    const fecthData = async () => {
      await postStore.fetchPost(slug).then(res => {
        postData.value = res
      })
      await nextTick()
      Prism.highlightAll()
    }

    onMounted(fecthData)

    return {
      cover: computed(() => {
        return {
          background: postData.value.cover,
          title: postData.value.title
        }
      }),
      postData
    }
  }
})
</script>

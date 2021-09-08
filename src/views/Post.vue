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
        <div
          class="post-near flex m-4 justify-between mb-12"
          v-if="postData.content"
        >
          <div class="post-prev flex-grow text-left pr-5">
            <a
              v-if="postData.prev_post.title"
              :href="`/post/${postData.prev_post.slug}`"
            >
              <span>
                <span class="post-near-title">上一篇</span>
                <br />
                <span class="post-prev-title">
                  {{ postData.prev_post.title }}
                </span>
              </span>
            </a>
            <a v-else class="cursor-pointer">
              <span>
                <span class="post-near-title">上一篇</span>
                <br />
                <span class="text-base">没有更多了</span>
              </span>
            </a>
          </div>
          <div class="post-next flex-grow text-right pl-5">
            <a
              v-if="postData.next_post.title"
              :href="`/post/${postData.next_post.slug}`"
            >
              <span>
                <span class="post-near-title">下一篇</span>
                <br />
                <span class="post-next-title">
                  {{ postData.next_post.title }}
                </span>
              </span>
            </a>
            <a v-else class="cursor-pointer">
              <span>
                <span class="post-near-title">下一篇</span>
                <br />
                <span class="text-base">没有更多了</span>
              </span>
            </a>
          </div>
        </div>
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

<style lang="scss" scoped>
.post-near {
  color: var(--post-near);
  background: var(--background-near);
  border: 0.0625rem solid var(--post-near-border);
  font-size: 1.0625rem;
  border-radius: 1rem;
  font-weight: 500;
  .post-prev,
  .post-next {
    a {
      @apply pt-9 pb-9 inline-block;
      .post-near-title {
        font-size: 0.875rem;
        padding-bottom: 0.25rem;
        line-height: 1rem;
      }
      .post-next-title,
      .post-prev-title {
        color: var(--text-footer);
        line-height: 1.5rem;
      }
    }
  }
  .post-prev {
    a {
      @apply pl-8;
    }
  }
  .post-next {
    a {
      @apply pr-8;
    }
  }
}
</style>

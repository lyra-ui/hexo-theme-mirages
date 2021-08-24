<template>
  <article class="m-4 md:m-8 lg:m-14" @click="$emit('postClick')">
    <div
      class="
        article-card
        relative
        cursor-pointer
        overflow-hidden
        rounded-md
        trans-300-ease-all
      "
    >
      <div class="absolute right-0 top-0 w-full h-full overflow-hidden">
        <img class="w-full h-full object-cover" :src="post.cover" alt="" />
      </div>
      <div
        class="
          article-mask
          relative
          h-36
          md:h-44
          lg:h-60
          z-50
          flex flex-wrap
          justify-center
          items-center
          text-center
        "
      >
        <div class="p-8">
          <h2
            class="
              mb-3
              w-full
              font-normal
              text-xl
              lg:text-3xl
              max-h-28
              overflow-hidden overflow-ellipsis
            "
          >
            {{ post.title }}
          </h2>
          <div class="text-sm">
            <span>{{ post.author.name }}</span>
            <span>・{{ post.date }}・</span>
            <span>{{ post.category || '未分类' }}</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['postClick']
})
</script>

<style lang="scss" scoped>
.article-card {
  color: #fff;
  &:hover {
    transform: scale(1.05);
  }
  .article-mask {
    background: rgba($color: #000000, $alpha: 0.25);
    h2 {
      -webkit-line-clamp: 3;
    }
    span {
      color: #eee;
    }
  }
}
</style>

<template>
  <div class="relative">
    <div class="absolute w-full h-full overflow-hidden">
      <img class="w-full h-full object-cover" :src="imgUrl" alt="" />
    </div>
    <div
      class="
        page-cover-mask
        relative
        flex flex-wrap
        justify-center
        items-center
        pb-0
        md:pt-14
        text-center
      "
      :style="coverHeight"
    >
      <div class="page-cover-text">
        <template v-if="type === 'home' || type === 'about'">
          <div v-if="type === 'about'" class="w-36 h-36">
            <img
              class="rotate rounded-full w-full h-full"
              :src="data.avator"
              alt=""
            />
          </div>
          <h1 class="w-full text-4xl">
            {{ data.subtitle || data.title }}
          </h1>
          <h2 class="text-base font-normal" v-if="data.description">
            {{ data.description }}
          </h2>
        </template>
        <template v-if="type === 'post'">
          <h1>
            {{ data.title }}
          </h1>
          <h2 class="text-sm font-normal">
            <span v-if="data.author">
              <LyraLink :text="data.author.name" />
            </span>
            ・
            <span>{{ dateFormater(data.date, 'YYYY 年 MM 月 DD 日') }}</span>
            ・
            <span v-for="item in data.categories" :key="item.name">
              <LyraLink :href="`/category/${item.slug}`" :text="item.name" />
            </span>
          </h2>
          <h2 class="text-sm font-normal">
            <span>{{ data.read_duration.symbolsCount }}</span>
            ・
            <span>{{ data.read_duration.symbolsTime }}</span>
          </h2>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent, toRefs } from 'vue'
import { dateFormater } from '@/utils'
import { Category } from '@/models/Article.class'
import LyraLink from '@/components/LyraLink.vue'

export default defineComponent({
  props: {
    data: Object,
    type: {
      type: String,
      default: 'home'
    }
  },
  components: {
    LyraLink
  },
  setup(props) {
    const appStore = useAppStore()
    const data = toRefs(props).data
    const coverHeight = computed(() => {
      let height = ''
      if (appStore.themeConfig.site.cover_percentage === 0) {
        height = window.innerWidth > 768 ? '520px' : '325px'
      } else {
        height = `${
          (window.innerHeight *
            Number(appStore.themeConfig.site.cover_percentage)) /
          100
        }px`
      }
      return `height: ${height}`
    })
    const imgUrl = computed(() => {
      if (data.value?.background) {
        return data.value?.background
      }
      if (data.value?.cover) {
        return data.value?.cover
      }
      return 'https://ftp.bmp.ovh/imgs/2021/07/68fc9e979e121749.jpg'
    })
    const computCategory = (cats: [Category]) => {
      return cats.map(item => item.name).join('·')
    }
    return {
      imgUrl,
      coverHeight,
      dateFormater,
      computCategory
    }
  }
})
</script>

<style lang="scss" scoped>
.page-cover-mask {
  background: rgba(0, 0, 0, 0.25);
  .page-cover-text {
    color: #fff;
  }
}
</style>

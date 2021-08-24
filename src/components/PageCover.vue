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
            <img class="rotate rounded-full" :src="data.avator" alt="" />
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
          <h2>
            {{ data.author }}・{{ data.date }}・阅读: {{ data.count }}・{{
              data.category
            }}
          </h2>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent, ref, toRefs, watch } from 'vue'

export default defineComponent({
  props: {
    data: Object,
    type: {
      type: String,
      default: 'home'
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const defaultUrl = 'https://ftp.bmp.ovh/imgs/2021/07/68fc9e979e121749.jpg'
    const background: string = toRefs(props).data.value?.background
    const coverHeight = ref({
      height: window.innerWidth > 768 ? '537px' : '325px'
    })
    watch(
      () => appStore.themeConfig.site.cover_percentage,
      newState => {
        if (window.innerWidth > 768)
          coverHeight.value.height = `${
            (window.innerHeight * Number(newState)) / 100
          }px`
      }
    )
    return {
      imgUrl: computed(() => {
        return background || defaultUrl
      }),
      coverHeight
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

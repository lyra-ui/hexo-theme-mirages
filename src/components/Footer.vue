<template>
  <footer
    id="lr-footer"
    class="w-full flex justify-center items-center pt-2 pb-2 text-center"
  >
    <div class="flex text-xs font-normal">
      <div v-if="customFooter"></div>
      <p class="leading-normal">
        Copyright&nbsp;&#169;&nbsp;2021&nbsp;
        <LyraLink href="" :text="author + '&nbsp;'" />
        <template v-if="!isDoubleLineFooter">&bull;&nbsp;</template>
        <br v-else />
        Powered&nbsp;by
        <LyraLink href="https://hexo.io" text="Hexo" />
        &bull;&nbsp;Theme
        <LyraLink href="" text="Mirages" />
      </p>
      <p v-if="beian.text || policeBeian.text">
        <LyraLink :href="beian.link" :text="beian.text" />
        <LyraLink :href="policeBeian.link" :text="policeBeian.text" />
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { computed, defineComponent } from 'vue'
import LyraLink from '@/components/LyraLink.vue'
import { useCommonStore } from '@/store/common'

export default defineComponent({
  components: {
    LyraLink
  },
  setup() {
    const appStore = useAppStore()
    const commonStore = useCommonStore()
    return {
      author: computed(() => {
        return appStore.themeConfig.author.name
      }),
      customFooter: computed(() => appStore.themeConfig.footer),
      beian: computed(() => {
        return appStore.themeConfig.site.beian
      }),
      policeBeian: computed(() => {
        return appStore.themeConfig.site.police_beian
      }),
      isDoubleLineFooter: computed(() => commonStore.isDoubleLineFooter)
    }
  }
})
</script>
<style lang="scss" scoped>
#lr-footer {
  color: var(--text-footer);
  background: var(--backgroud-footer);
}
</style>

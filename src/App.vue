<template>
  <div id="app-container" class="relative w-full overflow-hidden">
    <MainHeader />
    <div id="loading-bar-wrapper"></div>
    <router-view v-slot="{ Component }">
      <transition name="fade-slide-y" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <Footer />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'
import { useAppStore } from './store/app'
import { useCommonStore } from '@/store/common'
import { changeFavicon, getCookie, setCookie } from './utils'
import { MainHeader } from '@/components/Header'
import Footer from '@/components/Footer.vue'
import { useSpecificlistStore } from './store/specificlist'
export default defineComponent({
  components: {
    MainHeader,
    Footer
  },
  setup() {
    const appStore = useAppStore()
    const commonStore = useCommonStore()
    const specificlistStore = useSpecificlistStore()
    const MOBILE_WITH = 996
    const FOOTER_MIN_WITH = 396

    let pagelink = ``

    const isMobile = computed(() => {
      return commonStore.isMobile
    })
    const isDoubleLineFooter = computed(() => {
      return commonStore.isDoubleLineFooter
    })

    const resizeHandler = () => {
      const rect = document.body.getBoundingClientRect()
      const mobileState = rect.width - 1 < MOBILE_WITH
      const footerState = rect.width < FOOTER_MIN_WITH
      if (isMobile.value !== mobileState)
        commonStore.changeMobileState(mobileState)
      if (isDoubleLineFooter.value !== footerState)
        commonStore.changeFooterState(footerState)
    }

    const initResizeEvent = () => {
      resizeHandler()
      window.addEventListener('resize', resizeHandler)
    }

    const copyEventHandler = (e: any) => {
      if (document.getSelection() instanceof Selection) {
        if (document.getSelection()?.toString() !== '' && e.clipboardData) {
          e.clipboardData.setData('text', document.getSelection() + pagelink)
          e.preventDefault()
        }
      }
    }

    const intialCopyrightScript = () => {
      document.addEventListener('copy', copyEventHandler)
    }

    const darkModeHandler = () => {
      const media = window.matchMedia('(prefers-color-scheme: dark)')
      appStore.toggleTheme()
      media.onchange = () => {
        if (appStore.theme === 'auto') {
          const theme = media.matches ? 'theme-dark' : 'theme-light'
          appStore.toggleTheme(theme)
        }
      }
    }

    const initialApp = async () => {
      initResizeEvent()
      intialCopyrightScript()
      darkModeHandler()
      await appStore.fecthConfig().then(() => {
        // Change favicon dynamically.
        const favicon = appStore.themeConfig.site.favicon
        favicon && favicon !== '' && changeFavicon(favicon)
        comptuedAnnouncement()
      })
      await specificlistStore.fetchCategories()
      await specificlistStore.fetchAllTags()
    }

    onBeforeMount(initialApp)

    let showSideBar = ref(false)
    const toggleSidebar = () => {
      showSideBar.value = !showSideBar.value
    }
    const closeSidebar = () => {
      if (showSideBar.value) {
        showSideBar.value = false
      }
    }

    const loadingBarClass = ref({
      'nprogress-custom-parent': false
    })
    watch(
      () => appStore.appLoading,
      newState => {
        loadingBarClass.value['nprogress-custom-parent'] = newState
      }
    )

    const showAnnouncement = ref(false)
    const comptuedAnnouncement = () => {
      const lastAnnouncement = getCookie('announcement')
        ? decodeURIComponent(getCookie('announcement')!)
        : null
      const currentAnnouncement = appStore.themeConfig.site.announcement
      if (lastAnnouncement) {
        showAnnouncement.value = currentAnnouncement != lastAnnouncement
      } else {
        showAnnouncement.value =
          currentAnnouncement !== '' && currentAnnouncement !== null
      }
    }
    const confirmAnnouncement = () => {
      setCookie('announcement', appStore.themeConfig.site.announcement)
      comptuedAnnouncement()
    }
    return {
      theme: computed(() => appStore.theme),
      title: computed(() => appStore.themeConfig.site.title),
      announcement: computed(() => appStore.themeConfig.site.announcement),
      customFooter: computed(() => appStore.themeConfig.footer),
      isMobile,
      showSideBar,
      showAnnouncement,
      toggleSidebar,
      closeSidebar,
      confirmAnnouncement,
      loadingBarClass
    }
  }
})
</script>

<style lang="scss">
#app-container {
  background: var(--background-nomal);
  color: var(--text-color);
}
</style>

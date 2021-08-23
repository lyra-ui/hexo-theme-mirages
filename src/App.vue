<template>
  <div id="app-container" class="relative w-full">
    <MainHeader />
  </div>
  <Footer />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from 'vue'
import { useAppStore } from './store/app'
import { useCommonStore } from '@/store/common'
import { getCookie, setCookie } from './utils'
import { MainHeader } from '@/components/Header'
import Footer from '@/components/Footer.vue'
export default defineComponent({
  components: {
    MainHeader,
    Footer
  },
  setup() {
    const appStore = useAppStore()
    const commonStore = useCommonStore()
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
        if (favicon && favicon !== '') {
          const link = document.querySelector("link[rel~='icon']")
          if (link) {
            link.setAttribute('herf', appStore.themeConfig.site.favicon)
          } else {
            const node = document.createElement('link')
            node.rel = 'icon'
            node.href = appStore.themeConfig.site.favicon
            document.querySelector('head')?.appendChild(node)
          }
        }
        comptuedAnnouncement()
      })
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
  background: var(--backgroud-nomal);
}
</style>

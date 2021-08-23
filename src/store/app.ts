import NProgress from 'nprogress'
import { getCookie, setTheme } from '@/utils'
import { defineStore } from 'pinia'
import { ThemeConfig } from '@/models/ThemeConfig.class'
import { HexoConfig } from '@/models/HexoConfig.class'
import { fetchHexoConfig } from '@/api'

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  parent: '#loading-bar-wrapper'
})

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    theme: getCookie('theme') ? getCookie('theme')! : 'auto',
    appLoading: false,
    configReady: false,
    themeConfig: new ThemeConfig(),
    hexoCongfig: new HexoConfig(),
    NPTimeout: -1,
    loadingTimeout: -1
  }),
  getters: {
    getTheme(): string {
      return this.theme
    },
    getAppLoading(): boolean {
      return this.appLoading
    }
  },
  actions: {
    async fecthConfig() {
      this.configReady = false
      const { data } = await fetchHexoConfig()
      this.themeConfig = new ThemeConfig(data)
      this.hexoCongfig = new HexoConfig(data)
    },
    toggleTheme(theme?: string) {
      setTheme(theme ? theme : 'auto')
    },
    startLoading() {
      if (this.appLoading) return
      if (this.NPTimeout !== -1) clearTimeout(this.NPTimeout)
      if (this.loadingTimeout !== -1) clearTimeout(this.loadingTimeout)
      NProgress.start()
      this.appLoading = true
    },
    endLoading() {
      this.NPTimeout = setTimeout(() => {
        NProgress.done()
      }, 100)
      this.loadingTimeout = setTimeout(() => {
        this.appLoading = false
      }, 300)
    }
  }
})

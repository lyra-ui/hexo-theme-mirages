import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
  id: 'CommonStore',
  state: () => ({
    isMobile: false,
    isDoubleLineFooter: false
  }),
  getters: {},
  actions: {
    changeMobileState(isMobile: boolean) {
      this.isMobile = isMobile
    },
    changeFooterState(isDoubleLineFooter: boolean) {
      this.isDoubleLineFooter = isDoubleLineFooter
    }
  }
})

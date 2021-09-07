import { defineStore } from 'pinia'

export const useNavigatorStore = defineStore({
  id: 'navigatorStore',
  state: () => ({
    openMenu: false
  }),
  getters: {},
  actions: {
    toggleMobileMenu() {
      this.openMenu = !this.openMenu
    }
  }
})

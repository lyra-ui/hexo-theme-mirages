import { fetchPageBySource } from '@/api'
import { Page } from '@/models/Article.class'
import { defineStore } from 'pinia'

export const usePageStore = defineStore({
  id: 'page',
  state: () => ({}),
  getters: {},
  actions: {
    async fetchPage(source: string): Promise<Page> {
      const { data } = await fetchPageBySource(source)
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(new Page(data))
        }, 200)
      )
    }
  }
})

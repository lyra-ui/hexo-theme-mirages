import {
  fecthCategoryBySlug,
  fetchAllCategories,
  fetchTagBySlug,
  fetchAllTags
} from '@/api'
import { Categories, SpecificPostsList, Tags } from '@/models/Article.class'
import { defineStore } from 'pinia'

export const useSpecificlistStore = defineStore({
  // id is the name of the store
  // it is used in devtools and allows restoring state
  id: 'specificlist',
  state: () => ({
    isLoaded: false,
    categories: new Categories().data,
    tags: new Tags().data,
    specificlist: new SpecificPostsList()
  }),
  getters: {},
  actions: {
    async fetchCategories() {
      this.isLoaded = false
      const { data } = await fetchAllCategories()
      return new Promise(resolve => {
        this.isLoaded = true
        this.categories = new Categories(data).data
        resolve(this.categories)
      })
    },
    async fecthCategory(slug: string) {
      const { data } = await fecthCategoryBySlug(slug)
      return new Promise(resolve => {
        this.specificlist = new SpecificPostsList(data)
        resolve(this.specificlist)
      })
    },
    async fetchAllTags() {
      const { data } = await fetchAllTags()
      return new Promise(resolve => {
        this.tags = new Tags(data).data
        resolve(this.tags)
      })
    },
    async fecthTag(slug: string) {
      const { data } = await fetchTagBySlug(slug)
      return new Promise(resolve => {
        this.specificlist = new SpecificPostsList(data)
        resolve(this.specificlist)
      })
    }
  }
})

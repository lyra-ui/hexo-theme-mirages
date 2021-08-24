import { Post, PostList } from '@/models/Article.class'
import { fetchPostsList, fetchPostBySlug } from '@/api/index'
import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: new PostList()
  }),
  getters: {},
  actions: {
    async fetchPostsList(page?: number): Promise<PostList> {
      if (!page) page = 1
      const { data } = await fetchPostsList(page)
      return new Promise(resolve => {
        setTimeout(() => {
          this.posts = new PostList(data)
          resolve(this.posts)
        }, 200)
      })
    },
    async fetchPost(slug: string): Promise<Post> {
      const { data } = await fetchPostBySlug(slug)
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(new Post(data))
        }, 200)
      )
    }
  }
})

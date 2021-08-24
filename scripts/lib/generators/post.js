const { data } = require('autoprefixer')
const { configs } = require('eslint-plugin-prettier')
const { postListMapper, postMapper } = require('../helpers/mapper')

class PostGenerator {
  data = {}
  posts = []
  configs = {}
  author = {}

  constructor(data, configs) {
    this.data = data
    this.configs = configs
    this.posts = data.data
    this.author = this.configs.theme_config.author || {}
    this.transform()
  }

  transform() {
    if (this.count <= 0) return
    let prevPost = {}
    let cacheList = []
    this.customSort()
    this.posts.forEach((post, index) => {
      let current = postMapper(post, this.configs)
      current.prev_post = prevPost
      current.next_post = {}
      prevPost = postListMapper(current, this.configs)
      if (index !== 0 && index !== this.posts.length - 1) {
      }
      cacheList.push(current)
    })

    this.posts = cacheList
  }

  customSort() {
    const top = this.configs.theme_config.top || []
    let topPosts = this.posts
      .filter(item => top.indexOf(item.title) !== -1 && item.published)
      .map(item => {
        item.is_top = true
        return item
      })
    let normalPosts = this.posts
      .filter(item => top.indexOf(item.title) === -1 && item.published)
      .map(item => {
        item.is_top = false
        return item
      })
    // topPosts.sort('-date')
    // normalPosts.sort('-date')
    this.posts = topPosts.concat(normalPosts)
  }

  count() {
    return this.data.length
  }

  addPaginationPost(data) {
    if (this.count <= 0) return data
    const pageJson = []
    const length = this.count()
    // `Pinned mode` use first post as cover post.
    // To keep the list post count event, use 13 instead of 12
    const pageSize = 10
    const pageCount = Math.ceil(length / pageSize)
    const postData = this.data.map(item => {
      return postListMapper(item, this.configs)
    })

    for (let i = 0; i < length; i += pageSize) {
      pageJson.push({
        path: 'api/posts/' + Math.ceil((i + 1) / pageSize) + '.json',
        data: JSON.stringify({
          total: length,
          page_size: pageSize,
          total_pages: pageCount,
          posts: postData.slice(i, i + pageSize)
        })
      })
    }

    data = data.concat(pageJson)
    return data
  }

  addArticles(data) {
    if (this.count <= 0) return data
    data = data.concat(
      this.posts.map(post => {
        const path = 'api/articles/' + post.slug + '.json'
        return {
          path: path,
          data: JSON.stringify(post)
        }
      })
    )

    return data
  }
}

module.exports = PostGenerator

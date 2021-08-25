const {
  postListMapper,
  categoryMapper,
  categoryPageMapper
} = require('../helpers/mapper')
const pagination = require('hexo-pagination')

class CategoryGenerator {
  categories = []
  posts = []
  configs = {}

  constructor(categories, posts, configs) {
    this.categories = categories
    this.posts = posts
    this.configs = configs
    this.transform()
  }

  transform() {
    if (this.count <= 0) {
      this.categories.push({
        name: 'uncategorized',
        slug: 'uncategorized',
        count: this.posts.data.length,
        postlist: this.posts.data.map(post => {
          return postListMapper(post, configs)
        })
      })
      return
    }
    const categories = this.categories
    const posts = this.posts
    const configs = this.configs
    let groupedPostlist = []
    this.categories = categories.reduce((result, item) => {
      if (!item.length) return result
      groupedPostlist = groupedPostlist.concat(item.posts.data)
      return result.concat(
        pagination(item.path, posts, {
          perPage: 0,
          data: {
            name: item.name,
            slug: item.slug,
            count: item.posts.length,
            path: 'api/categories/' + item.slug + '.json',
            postlist: item.posts.map(post => {
              return postListMapper(post, configs)
            })
          }
        })
      )
    }, [])
    let uncategorizedPostlist = []
    posts.data.forEach(a => {
      let c = groupedPostlist.findIndex(b => a?.title === b?.title)
      if (c > -1) delete groupedPostlist[c]
      else uncategorizedPostlist.push(a)
    })

    this.categories = [
      {
        name: 'uncategorized',
        slug: 'uncategorized',
        count: uncategorizedPostlist.length,
        path: 'api/categories/uncategorized.json',
        postlist: uncategorizedPostlist.map(post => {
          return postListMapper(post, configs)
        })
      }
    ].concat(this.categories)
  }
  count() {
    return this.categories.length
  }
  addCategories(data) {
    if (this.count() <= 0) {
      data.push({
        path: 'api/categories.json',
        data: JSON.stringify([])
      })
    } else {
      data.push({
        path: 'api/categories.json',
        data: JSON.stringify(this.categories.map(categoryMapper))
      })
      const categoryPages = this.categories.map(categoryPageMapper)
      data = data.concat(categoryPages)
    }
    return { data, defaultCat: categoryMapper(this.categories[0]) }
  }
}

module.exports = CategoryGenerator

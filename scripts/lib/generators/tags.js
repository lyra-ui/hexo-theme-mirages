const {
  postListMapper,
  tagMapper,
  tagPageMapper
} = require('../helpers/mapper')
const pagination = require('hexo-pagination')

class TagsGenerator {
  tags = []
  posts = []
  configs = {}
  constructor(categories, posts, configs) {
    this.tags = categories
    this.posts = posts
    this.configs = configs
    this.transform()
  }
  transform() {
    if (this.count() <= 0) return
    const tags = this.tags
    const posts = this.posts
    const configs = this.configs

    this.data = tags.reduce(function (result, item) {
      if (!item.length) return result

      return result.concat(
        pagination(item.path, posts, {
          perPage: 0,
          data: {
            name: item.name,
            slug: item.slug,
            count: item.posts.length,
            path: 'api/tags/' + item.slug + '.json',
            postlist: item.posts.map(post => {
              return postListMapper(post, configs)
            })
          }
        })
      )
    }, [])
  }
  addTags(data) {
    if (this.count <= 0) {
      data.push({
        path: 'api/tags.json',
        data: JSON.stringify([])
      })
    } else {
      data.push({
        path: 'api/tags.json',
        data: JSON.stringify(this.tags.map(tagMapper))
      })
      data = data.concat(this.tags.map(tagPageMapper))
    }

    return data
  }
  count() {
    return this.tags.length
  }
}

module.exports = TagsGenerator

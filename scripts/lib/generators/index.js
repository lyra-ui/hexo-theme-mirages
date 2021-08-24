const SiteGenerator = require('./site')
const PostGenerator = require('./post')
const PageGenerator = require('./page')
const CategoryGenerator = require('./category')
const TagsGenerator = require('./tags')

module.exports = function (hexo) {
  let apiData = []
  hexo.extend.generator.register('mirages-api', function (site) {
    return generator(
      Object.assign({}, hexo.config, {
        theme_config: hexo.theme.config
      }),
      site
    )
  })

  function generator(configs, site) {
    const siteConfig = new SiteGenerator(configs)
    apiData = siteConfig.addSiteConfig(apiData)

    const posts = new PostGenerator(site.posts, configs)
    apiData = posts.addPaginationPost(apiData)
    apiData = posts.addArticles(apiData)

    const pages = new PageGenerator(site.pages, configs)
    apiData = pages.addPages(apiData)

    const category = new CategoryGenerator(site.categories, site.posts, configs)
    apiData= category.addCategories(apiData)

    const tags = new TagsGenerator(site.tags, site.posts, configs)
    apiData = tags.addTags(apiData)

    return apiData
  }
}

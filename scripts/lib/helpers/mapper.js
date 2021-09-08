const { randomValue, generateUid } = require('./utils')
const truncateHTML = require('./truncate-html')
const symbolsCountTime = require('./symbols-count-time')

function postMapper(post, configs, defaultCat) {
  const pictures = configs.theme_config.pictures
  const pinKey = configs.theme_config.pins.key
  const pins = configs.theme_config.pins.data
  return {
    title: post.title,
    uid: post.uid || post.uuid || generateUid('post_uid___' + post.title),
    slug: post.slug,
    date: post.date,
    updated: post.updated,
    comments: post.comments,
    path: 'api/articles/' + post.slug + '.json',
    cover: post.cover || randomValue(pictures),
    content: post.content,
    pinned: post.pinned || pinnedMapper(post[pinKey], pins),
    preview: truncateHTML(post.content, post.preview || 140),
    read_duration: symbolsCountTime(post.content),
    categories: post.categories?.length > 0 ? postCategoryMapper(post) : [defaultCat],
    tags: post.tags ? postTagMapper(post) : [],
    // toc: toc(post.content),
    author: authorMapper(post.author, configs),
    mapped: true
  }
}

function postListMapper(post, configs) {
  if (!post.mapped) post = postMapper(post, configs)
  const pictures = configs.theme_config.pictures
  return {
    title: post.title,
    slug: post.slug,
    date: post.date,
    updated: post.updated,
    comments: post.comments,
    path: post.path,
    cover: post.cover || randomValue(pictures),
    author: post.author,
    catagories: post.categories,
    tags: post.tags,
    pinned: post.pinned
  }
}

function authorMapper(author, configs) {
 if(author) return author
 // TODO: Support other authors' socials link
 return configs.theme_config.author
}

function pinnedMapper(title, pins) {
  if (pins && title) return pins.indexOf(title) !== -1
  return false
}

function postCategoryMapper(post) {
  return post.categories.map(function (cat) {
    return {
      name: cat.name,
      slug: cat.slug,
      count: cat.posts.length,
      path: 'api/categories/' + cat.slug + '.json'
    }
  })
}

function postTagMapper(post) {
  return post.tags.map(function (tag) {
    return {
      name: tag.name,
      slug: tag.slug,
      count: tag.posts.length,
      path: 'api/tags/' + tag.slug + '.json'
    }
  })
}

function pageMapper(page, configs) {
  // const safe_title = page.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  const sourceMappedPath = page.source.replace(/\.md$/, '.json')
  const path = 'api/pages/' + sourceMappedPath
  return {
    path: path,
    data: JSON.stringify({
      title: page.title,
      uid: generateUid('page_uid___' + page.title),
      text: truncateHTML(page.content),
      date: page.date,
      updated: page.updated,
      comments: page.comments,
      path: path,
      cover: page.cover || randomValue(configs.theme_config.pictures),
      excerpt: page.excerpt,
      content: page.content,
      read_duration: symbolsCountTime(page.content)
    })
  }
}

function categoryMapper(category) {
  const data = !category['data'] ? category : category.data
  return {
    name: data.name,
    path: data.path,
    slug: data.slug,
    count: data.count
  }
}

function categoryPageMapper(category) {
  const data = !category['data'] ? category : category.data
  return {
    path: data.path,
    data: JSON.stringify({
      name: data.name,
      slug: data.slug,
      count: data.count,
      postlist: data.postlist
    })
  }
}
function tagMapper(tag) {
  const data = !tag.data ? tag : tag.data
  return {
    name: data.name,
    path: data.path,
    slug: data.slug,
    count: data.count
  }
}

function tagPageMapper(tag) {
  const data = !tag.data ? tag : tag.data
  return {
    path: data.path,
    data: JSON.stringify({
      name: data.name,
      slug: data.slug,
      count: data.count,
      postlist: data.postlist
    })
  }
}
module.exports = {
  postMapper,
  postListMapper,
  pageMapper,
  categoryMapper,
  categoryPageMapper,
  tagMapper,
  tagPageMapper
}

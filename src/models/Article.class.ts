import { GeneralOptions, StringOptions } from './Common.class'

/**
 * Pages
 */
export class Page {
  title = ''
  uid = ''
  date = ''
  updated = ''
  comments = false
  path = ''
  cover = ''
  excerpt: string | null = null
  content = ''

  constructor(raw?: StringOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

/**
 * Posts
 */
export class Post {
  title = ''
  uid = ''
  slug = ''
  date = ''
  updated = ''
  comments = false
  path = ''
  cover = ''
  content = ''
  pinned = false
  preview = ''
  read_duration = {}
  author = {
    name: ''
  }
  categories = []
  tags = []

  constructor(raw?: StringOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class PostList {
  posts: Post[] = []
  total_pages = 0
  page_size = 0
  current = 0

  constructor(raw?: { [ket: string]: [] }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'post') {
            Object.assign(this, {
              [key]: raw[key].map((one: StringOptions) => new Post(one))
            })
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }
}
export interface GridItem {
  name: string
  slug: string
  path: string
  count: number
}

export class Category implements GridItem {
  name = ''
  slug = ''
  path = ''
  count = 0
  parent = ''

  constructor(raw?: StringOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }

      if (!(raw instanceof Category)) {
        this.parent = this.slug
          .split('/')
          .filter((v, i, a) => i !== a.length - 1)
          .join('/')
      }
    }
  }
}

export class Categories {
  data: Category[] = []

  constructor(raw?: []) {
    if (raw) {
      Object.assign(this, {
        data: raw.map((one: StringOptions) => new Category(one))
      })
    }
  }
}

export class Tag implements GridItem {
  name = ''
  slug = ''
  path = ''
  count = 0
  constructor(raw?: StringOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class Tags {
  data: Tag[] = []

  constructor(raw?: []) {
    if (raw) {
      Object.assign(this, {
        data: raw.map((one: StringOptions) => new Tag(one))
      })
    }
  }
}

export class SpecificPostsList {
  name = ''
  slug = ''
  count = 0
  postlist: Post[] = []

  constructor(raw?: GeneralOptions) {
    if (raw && raw.postlist) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'postlist') {
            Object.assign(this, {
              [key]: raw[key].map((one: StringOptions) => new Post(one))
            })
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }
}

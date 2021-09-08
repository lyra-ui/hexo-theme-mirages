import { GeneralOptions, StringOptions, EmptyCheckable } from './Common.class'
interface ThemeRaw {
  theme_config: {
    site: GeneralOptions
    author: GeneralOptions
    menu: GeneralOptions
    socials: GeneralOptions
    theme_preset: GeneralOptions
    qr_code: StringOptions
    pictures: [string]
    plugin: GeneralOptions
    rss: {
      enable: boolean
      path: string
    }
    footer: string
    version: string
  }
}

export class Site {
  title = ''
  subtitle = ''
  description = ''
  announcement = ''
  logo = ''
  favicon = ''
  background = ''
  cover_percentage = 47
  beian = {
    text: '',
    link: ''
  }
  police_beian = {
    text: '',
    link: ''
  }
  /**
   *
   * @param raw - Config data generated from Hexo
   */
  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }

  pageCover(): any {
    return {
      subtitle: this.subtitle,
      description: this.description,
      background: this.background
    }
  }
}

export class Author {
  name = ''
  avator = ''
  link = ''
  description = ''

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

export class CustomMenu {
  name = ''
  path = ''
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

export class Menu {
  name = ''
  path = ''
  children: Menu[] = []
  constructor(menu: GeneralOptions) {
    this.name = menu.name
    this.path = menu.path ? menu.path : null
    this.children = menu.children
      ? Object.keys(menu.children).map(
          (key: string) => new Menu(menu.children[key])
        )
      : []
  }
}

interface Menus {
  menus: { [key: string]: Menu }
}

export class ThemeMenu implements Menus {
  menus: { [key: string]: Menu } = {}
  constructor(raw?: GeneralOptions) {
    const extract: GeneralOptions = {
      category: {
        name: '分类',
        path: '/categories'
      },
      archives: {
        name: '归档',
        path: '/archives'
      },
      tags: {
        name: '标签',
        path: '/tags'
      },
      about: {
        name: '关于',
        path: '/about'
      }
    }

    const defaultMenus = Object.keys(extract)
    if (raw) {
      // Theme default menus
      for (const menu of defaultMenus) {
        if (typeof raw[menu] === 'boolean' && raw[menu]) {
          Object.assign(this.menus, { [menu]: new Menu(extract[menu]) })
        }
      }
      // Theme custom menus
      for (const otherMenu of Object.keys(raw)) {
        if (defaultMenus.indexOf(otherMenu) < 0 && raw[otherMenu]?.name) {
          Object.assign(this.menus, {
            [otherMenu]: new Menu(raw[otherMenu])
          })
        }
      }
    }
  }
}

export class Socials implements EmptyCheckable {
  github = ''
  twitter = ''
  weibo = ''
  customs: { [key: string]: CustomSocial } = {}

  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(raw)) {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          Object.assign(this, { [key]: raw[key] })
        } else {
          Object.assign(this.customs, {
            [key]: new CustomSocial(raw[key])
          })
        }
      }
    }
  }

  isEmpty(): boolean {
    return (
      this.github.length === 0 &&
      this.twitter.length === 0 &&
      this.weibo.length === 0 &&
      this.customs === {}
    )
  }
}

class CustomSocial {
  name = ''
  icon = ''
  link = ''
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

export class CustomSocials implements EmptyCheckable {
  socials: CustomSocial[] = []

  constructor(raw?: { [key: string]: StringOptions }) {
    if (raw) {
      Object.assign(
        this.socials,
        Object.keys(raw).map((key: string) => new CustomSocial(raw[key]))
      )
    }
  }

  isEmpty(): boolean {
    return this.socials.length === 0
  }
}

export class ThemePreset {
  main_color = ''
  main_dark_color = ''
  navigator = ''
  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class QRCode {
  current_page = ''
  pay = ''
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

type MetaAttributes = 'nick' | 'mail' | 'link'
interface PluginsData {
  gitalk: {
    enable: boolean
    autoExpand: boolean
    clientID: string
    clientSecret: string
    repo: string
    owner: string
    admin: Array<string>
    id: string
    language: string
    distractionFreeMode: boolean
    recentComment: boolean
    proxy: string
  }

  valine: {
    enable: boolean
    app_id: string
    app_key: string
    avatar: string
    placeholder: string
    visitor: boolean
    lang: string
    meta: MetaAttributes[]
    admin: string
    recentComment: boolean
  }
  recent_comments: boolean
  busuanzi: {
    enable: boolean
  }
  copy_protection: {
    enable: boolean
    author: string
    link: string
    license: string
  }
}

export class Plugins implements PluginsData {
  gitalk = {
    enable: false,
    autoExpand: true,
    clientID: '',
    clientSecret: '',
    repo: 'blog-comments',
    owner: 'TriDiamond',
    admin: ['TriDiamond'],
    id: 'location.pathname',
    language: 'en',
    distractionFreeMode: false,
    recentComment: false,
    proxy: ''
  }
  valine = {
    enable: false,
    app_id: '',
    app_key: '',
    avatar: 'mp',
    placeholder: 'Leave your thoughts behind~',
    visitor: true,
    lang: '',
    meta: [],
    requiredFields: [],
    avatarForce: false,
    admin: '',
    recentComment: false
  }
  recent_comments = false
  busuanzi = {
    enable: true
  }
  copy_protection = {
    enable: true,
    author: '',
    link: '',
    license: ''
  }
  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

export class ThemeConfig {
  site = new Site()
  author = new Author()
  menu = new ThemeMenu()
  socials = new Socials()
  theme_preset = new ThemePreset()
  qrcode = new QRCode()
  pictures: string[] = []
  plugins = new Plugins()
  rss = {
    enable: false,
    path: ''
  }
  footer = ''
  version = ''
  constructor(raw?: ThemeRaw) {
    const rawConfig = raw && raw['theme_config']
    if (rawConfig) {
      this.site = new Site(rawConfig.site)
      this.author = new Author(rawConfig.author)
      this.menu = new ThemeMenu(rawConfig.menu)
      this.socials = new Socials(rawConfig.socials)
      this.theme_preset = new ThemePreset(rawConfig.theme_preset)
      this.qrcode = new QRCode(rawConfig.qr_code)
      this.theme_preset = new ThemePreset(rawConfig.theme_preset)
      this.pictures = rawConfig.pictures
      this.plugins = new Plugins(rawConfig)
      this.rss = rawConfig.rss
      this.version = rawConfig.version
      this.footer = rawConfig.footer
    }
  }
}

import { GeneralOptions, StringOptions, EmptyCheckable } from './Common.class'
interface ThemeRaw {
  theme_config: {
    site: GeneralOptions
    author: GeneralOptions
    custom_menus: [StringOptions]
    socials: GeneralOptions
    theme_preset: GeneralOptions
    qr_code: StringOptions
    pictures: [string]
    plugin: GeneralOptions
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

export class CustomMenus {
  menus: CustomMenu[] = []
  constructor(raw?: [StringOptions]) {
    if (raw) {
      this.menus = raw.map(item => new CustomMenu(item))
    }
  }
}

export class Socials implements EmptyCheckable {
  github = ''
  twitter = ''
  weibo = ''
  customs = new CustomSocials()

  constructor(raw?: GeneralOptions) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          if (key === 'custom') {
            Object.assign(this.customs, new CustomSocials(raw[key]))
          } else {
            Object.assign(this, { [key]: raw[key] })
          }
        }
      }
    }
  }

  isEmpty(): boolean {
    return this.github.length === 0 && this.twitter.length === 0 && this.weibo.length === 0 && this.customs.isEmpty()
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

  constructor(raw?: [StringOptions]) {
    if (raw) {
      Object.assign(
        this.socials,
        raw.map((item: StringOptions) => {
          return new CustomSocial(item)
        })
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
    author: {
      cn: string
      en: string
    }
    link: {
      cn: string
      en: string
    }
    license: {
      cn: string
      en: string
    }
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
    author: {
      cn: '',
      en: ''
    },
    link: {
      cn: '',
      en: ''
    },
    license: {
      cn: '',
      en: ''
    }
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
  custom_menus = new CustomMenus()
  socials = new Socials()
  theme_preset = new ThemePreset()
  qrcode = new QRCode()
  pictures: string[] = []
  plugins = new Plugins()
  footer = ''
  version = ''
  constructor(raw?: ThemeRaw) {
    const rawConfig = raw && raw['theme_config']
    if (rawConfig) {
      this.site = new Site(rawConfig.site)
      this.author = new Author(rawConfig.author)
      this.custom_menus = new CustomMenus(rawConfig.custom_menus)
      console.log(this.custom_menus)
      this.socials = new Socials(rawConfig.socials)
      this.theme_preset = new ThemePreset(rawConfig.theme_preset)
      this.qrcode = new QRCode(rawConfig.qr_code)
      this.theme_preset = new ThemePreset(rawConfig.theme_preset)
      this.pictures = rawConfig.pictures
      this.plugins = new Plugins(rawConfig)
      this.version = rawConfig.version
      this.footer = rawConfig.footer
    }
  }
}

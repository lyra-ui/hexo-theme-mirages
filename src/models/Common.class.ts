import { Author } from './ThemeConfig.class'

export interface EmptyCheckable {
  isEmpty(): boolean
}

export interface GeneralOptions {
  [key: string]: any
}

export interface StringOptions {
  [key: string]: string
}

export interface ArrayOptions {
  [key: string]: []
}

export class Hitokoto {
  id = 0
  uuid = ''
  hitokoto = ''
  type = ''
  from = ''
  from_who = ''
  creator = ''
  creator_uid = ''
  reviewer = ''
  commit_from = ''
  created_at = ''
  length = 0

  constructor(raw?: { [key: string]: any }) {
    if (raw) {
      for (const key of Object.keys(this)) {
        if (Object.prototype.hasOwnProperty.call(raw, key)) {
          Object.assign(this, { [key]: raw[key] })
        }
      }
    }
  }
}

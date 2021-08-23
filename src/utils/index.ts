import Cookies from 'js-cookie'

const getSystemMode = (): string => {
  // dark-mode media query matched or not
  const matched = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (matched) return 'theme-dark'
  else return 'theme-light'
}

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key)
}

export const setCookie = (key: string, value: any): void => {
  Cookies.set(key, value)
}

export const setTheme = (theme: string): void => {
  function _setTheme(theme: string) {
    if (theme === 'theme-dark') {
      document.body.classList.remove('theme-light')
      document.body.classList.add('theme-dark')
    } else {
      document.body.classList.remove('theme-dark')
      document.body.classList.add('theme-light')
    }
  }
  const _theme = theme === 'auto' ? getSystemMode() : theme
  _setTheme(_theme)
}

export const randomValue = (data: Array<any>): any => {
  const index = Math.floor(Math.random() * data.length)
  return index > data.length ? data[0] : data[index]
}

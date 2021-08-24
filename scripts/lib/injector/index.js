const fs = require('fs')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = function (hexo) {
  const themeConfig = Object.assign({}, hexo.config.theme_config)

  if (themeConfig.site.description) {
    hexo.extend.injector.register(
      'head_begin',
      `<meta name="description" content="${themeConfig.site.description}"></meta>`
    )
  }

  if (themeConfig.injects) {
    if (themeConfig.injects.scripts) {
      themeConfig.injects.scripts.forEach(element => {
        hexo.extend.injector.register('body_end', element)
      })
    }

    if (themeConfig.injects.css) {
      themeConfig.injects.css.forEach(element => {
        hexo.extend.injector.register('head_end', element)
      })
    }
  }
}

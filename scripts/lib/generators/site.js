const pack = require('../../../package.json')

class SiteGenerator {
  configs = {}
  constructor(configs) {
    configs.theme_config.version = pack.version
    this.configs = configs
  }

  addSiteConfig(data) {
    const configs = this.configs
    data.push({
      path:'api/site.json',
      data: JSON.stringify(configs)
    })
    return data
  }
}

module.exports = SiteGenerator

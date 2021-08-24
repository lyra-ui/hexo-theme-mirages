const { pageMapper } = require('../helpers/mapper')

class PageGenerator {
  pages = []
  configs = {}
  constructor(pages, configs) {
    this.pages = pages.data
    this.configs = configs
  }

  addPages(data) {
    data = data.concat(this.pages.map(page => pageMapper(page, this.configs)))
    return data
  }
}

module.exports = PageGenerator

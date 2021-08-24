const crypto = require('crypto')

exports.randomValue = function (data) {
  if (data instanceof Array) {
    const index = Math.floor(Math.random() * data.length)
    return index > data.length ? data[0] : data[index]
  }
  return null
}

exports.generateUid = function (str) {
  return crypto.createHash('md5').update(str).digest('hex')
}
exports.filterHTMLCharacters = function (str) {
  // Removing all html tags
  // Removing all line breakers.
  return String(str)
    .replace(/(&nbsp;|<([^>]+)>)/gi, '')
    .replace('/\n/gm', ' ')
}

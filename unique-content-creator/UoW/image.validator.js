const
  { parse } = require('url'),
  http = require('http'),
  sizeOf = require('image-size'),
  ContentValidator = require('./content.validator');
/*
*   @see
*   https://github.com/image-size/image-size
*/
module.exports = class ImageValidator {
  constructor(src) {
    this.src = src;
  }


  async isValidImage() {
    const
      isValidImageSRC = this.isValidImageSRC(),
      isValidImageSize = await this.isValidImageSize();
    return isValidImageSRC && isValidImageSize;
  }

  async isValidImageSize() {
    const { width, height } = await this.computeImageSizes(this.src);
    return width > 300 && height > 300;
  }

  computeImageSizes() {
    return new Promise(function (resolve, reject) {
      http.get(parse(this.src), function (response) {
        const chunks = [];
        response
          .on('error', function (e) {
            return reject(e);
          })
          .on('data', function (chunk) {
            chunks.push(chunk);
          })
          .on('end', function () {
            return resolve(sizeOf(
              Buffer.concat(chunks)
            ));
          });
      });
    });
  }

  isValidImageSRC() {
    return /http|https/.test(this.src) &&
      ContentValidator.isValidLanguage(this.src) &&
      ContentValidator.isNotPorn(this.src);
  }
}

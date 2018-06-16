const
  { promisify } = require('util'),
  { parse } = require('url'),
  http = require('http'),
  sizeOf = promisify(require('image-size')),
  ContentValidator = require('./content.validator');
/*
*   @see
*   https://github.com/image-size/image-size
*
*   @random
*   https://source.unsplash.com/random
*   https://picsum.photos/600/400/?random
*/
module.exports = class ImageValidator {
  constructor(src) {
    this.src = src;
  }


  async isValidImage() {
    const isValidImageSRC = this.isValidImageSRC();
    if (!isValidImageSRC) return false;
    const isValidImageSize = await this.isValidImageSize();
    return isValidImageSRC && isValidImageSize;
  }

  async isValidImageSize() {
    try {
      const { width, height } = await this.computeImageSizes(this.src);
      return width >= 500 && height >= 300;
    } catch (e) {
      return false;
    }
  }

  computeImageSizes() {
    return new Promise((resolve, reject) => http
      .get(parse(this.src), function (response) {
        const chunks = [];
        response
          .on('error', function (e) {
            console.error(e);
            return reject(e);
          })
          .on('data', function (chunk) {
            chunks.push(chunk);
          })
          .on('end', async function () {
            try {
              const sizes = await sizeOf(Buffer.concat(chunks));
              console.log('sizes', sizes);
              return resolve(sizes);
            } catch (e) {
              console.error(e);
              return reject(e);
            }
          });
      })
      .on('error', function (e) {
        console.error(e);
        return reject(e);
      })
    );
  }

  isValidImageSRC() {
    return this.src &&
      /^http?:\/\/.*\.(?:png|jpg)$/.test(this.src) &&
      !/(icon|Icon|logo|Logo)/.test(this.src) &&
      ContentValidator.isValidLanguage(this.src) &&
      ContentValidator.isNotPorn(this.src);
  }
}

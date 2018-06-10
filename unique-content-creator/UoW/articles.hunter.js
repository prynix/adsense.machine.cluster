const
  fetch = require('./fetch'),
  limits = {
    articles: 30,
    paragraphs: 5,
    symbols: 3000
  };



module.exports = class ArticlesHunter {

  static sanitize(untrustedText) {
    return untrustedText.replace(/<[^>]+>/ig, '');
  }

  static isValidHeader(h1) {
    if (h1.length > 10 && h1.length < 50 && h1.split(' ').length >= 2) {
      return true;
    } else {
      return false;
    }
  }

  static isValidParagraph(p) {
    if (h1.length > 400 && h1.length < 1500) {
      return true;
    } else {
      return false;
    }
  }

  static isValidImageSRC(src) {
    if (/http|https/.exec(src)) {
      return true;
    } else {
      return false;
    }
  }


  constructor(sitesURLs) {
    this.urls = sitesURLs;

    this.headers = [];
    this.paragraphs = [];
    this.images = [];

    this.articles = [];
  }


  async fetchContent() {
    const
      { urls } = this,
      { length } = urls;
    for (let i = 0; i < length; i++) {
      try {
        // todo пройтись по сайту?
        const $ = await fetch(urls[i]);

        $('h1').each((i, h1) => {
          const header = $(h1).text();
          if (ArticlesHunter.isValidHeader(header)) {
            this.headers.push(
              ArticlesHunter.sanitize(header)
            )
          }
        });

        $('p').each((i, p) => {
          const paragraph = $(p).text();
          if (ArticlesHunter.isValidParagraph(paragraph)) {
            this.paragraphs.push(
              ArticlesHunter.sanitize(paragraph)
            )
          }
        });

        $('img').each((i, img) => {
          const src = $(img).attr('src');
          if (ArticlesHunter.isValidImageSRC(paragraph)) {
            this.images.push(src);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  buildArticlesFromContent() {
    /*
    categories
    
    pathname
    img
    header
    paragraphs
    */
  }

  async scrape() {
    await this.fetchContent();
    return this.articles;
  }
}
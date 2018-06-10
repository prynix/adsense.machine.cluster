const
  fetch = require('./fetch'),
  limits = {
    articles: 30,
    paragraphs: 7,
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
    if (p.length > 350 && p.length < 1500) {
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

  static getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  get randomCategory() {
    return this.categories[
      ArticlesHunter.getRandomIndex(0, this.categories.length - 1)
    ];
  }

  get randomHeader() {
    const
      { headers } = this,
      index = ArticlesHunter.getRandomIndex(0, headers.length - 1),
      randomHeader = headers[index];
    headers.splice(index, 1);
    return randomHeader;
  }

  get randomImage() {
    const
      { images } = this,
      index = ArticlesHunter.getRandomIndex(0, images.length - 1),
      randomImage = images[index];
    images.splice(index, 1);
    return randomImage;
  }

  get randomParagraph() {
    const
      { paragraphs } = this,
      index = ArticlesHunter.getRandomIndex(0, paragraphs.length - 1),
      randomParagraph = paragraphs[index];
    paragraphs.splice(index, 1);
    return randomParagraph;
  }


  constructor(sitesURLs, categories) {
    this.urls = sitesURLs;
    this.categories = categories;

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
          if (ArticlesHunter.isValidImageSRC(src)) {
            this.images.push(src);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  buildArticlesFromContent() {
    for (let i = 0; i < limits.articles; i++) {
      let
        header = this.randomHeader,
        categories = new Set(),
        article = { paragraphs: [] };

      categories.add(this.randomCategory);
      categories.add(this.randomCategory);
      article.categories = Array.from(categories);

      article.pathname = header;
      article.header = header;
      article.img = this.randomImage;

      for (let j = 0; j < limits.paragraphs; j++) {
        article.paragraphs.push(this.randomParagraph);
      }

      this.articles.push(article);
    }
  }

  async scrape() {
    await this.fetchContent();
    this.buildArticlesFromContent();
    return this.articles;
  }
}
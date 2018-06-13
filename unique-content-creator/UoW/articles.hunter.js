const
  ContentValidator = require('./content.validator'),
  ImageValidator = require('./image.validator'),
  fetch = require('./fetch'),
  { config } = require('../../config'),
  { limits } = config;



module.exports = class ArticlesHunter {

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
    return randomParagraph || '';
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
    // todo
    for (let i = 0; i < length; i++) {
      let notification = `\tarticle № ${i + 1} complete`;
      console.time(notification);
      try {
        const $ = await fetch(urls[i]);

        $('h1').each((i, h1) => {
          const header = $(h1).text();
          if (ContentValidator.isValidHeader(header)) {
            this.headers.push(
              ContentValidator.sanitize(header)
            )
          }
        });

        $('h2').each((i, h2) => {
          const header = $(h2).text();
          if (ContentValidator.isValidHeader(header)) {
            this.headers.push(
              ContentValidator.sanitize(header)
            )
          }
        });

        $('p').each((i, p) => {
          const paragraph = $(p).text();
          if (ContentValidator.isValidParagraph(paragraph)) {
            this.paragraphs.push(
              ContentValidator.sanitize(paragraph)
            )
          }
        });

        $('img').each((i, img) => {
          const
            src = $(img).attr('src'),
            imageValidator = new ImageValidator(src),
            isValidImage = await imageValidator.isValidImage();
          if (isValidImage) this.images.push(src);
        });
      } catch (e) {
        console.error(e);
      }
      console.timeEnd(notification);
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

      article.pathname = ContentValidator.beautifyPathname(header);
      article.header = header;
      article.img = this.randomImage;

      for (let j = 0; j < limits.paragraphs; j++) {
        article.paragraphs.push(
          ContentValidator.beautifyParagraph(this.randomParagraph)
        );
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
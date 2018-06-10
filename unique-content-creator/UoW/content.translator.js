const
  translate = require('google-translate-api'),
  config = { from: 'en', to: 'ru' };



module.exports = class ContentTranslator {
  constructor(articles) {
    this.articles = articles;
    this.translatedArticles = [];
  }


  async googleTranslate() {
    const
      { articles } = this,
      { length } = articles;
    for (let i = 0; i < length; i++) {
      const article = articles[i];
      try {
        let header = await translate(article.header, config);
        console.info(`\n\ngoogleTranslate\n`, header.text);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async translate() {
    console.log(`ContentTranslator`);
    await this.googleTranslate();
    return this.translatedArticles;
  }
}
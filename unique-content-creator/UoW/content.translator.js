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
      let notification = `\ttranslation № ${i + 1} complete`;
      console.time(notification);
      const
        article = articles[i],
        { paragraphs } = article,
        len = paragraphs.length;
      if (!article.header) continue;
      try {
        let header = await translate(article.header, config);
        article.header = header.text;

        for (let j = 0; j < len; j++) {
          if (!paragraphs[j]) continue;
          let paragraph = await translate(paragraphs[j], config);
          paragraphs[j] = paragraph.text;
        }

        this.translatedArticles.push(article);
      } catch (e) {
        console.error(e);
      }
      console.timeEnd(notification);
    }
  }

  async translate() {
    await this.googleTranslate();
    return this.translatedArticles;
  }
}
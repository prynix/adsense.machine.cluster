const
  translate = require('google-translate-api'),
  config = { to: 'ru' };



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
        let header = await this.translateDelay(article.header);
        article.header = header.text;

        for (let j = 0; j < len; j++) {
          if (!paragraphs[j]) continue;
          let paragraph = await this.translateDelay(paragraphs[j]);
          paragraphs[j] = paragraph.text;
        }

        this.translatedArticles.push(article);
      } catch (e) {
        console.error(e);
        continue;
      }
      console.timeEnd(notification);
    }
  }


  async translateDelay(foreinContent) {
    return new Promise((resolve, reject) =>
      setTimeout(async function () {
        try {
          const translatedContent = await translate(foreinContent, config);
          return resolve(translatedContent);
        } catch (e) {
          console.error(e);
          return reject(e);
        }
      }, 5 * 1000)
    );
  }


  async translate() {
    await this.googleTranslate();
    return this.translatedArticles;
  }
}
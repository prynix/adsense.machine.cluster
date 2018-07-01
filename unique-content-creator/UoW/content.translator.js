const translator = require('google-translator');
/*
*   @see
*   https://github.com/731MY/google-translator
*/
module.exports = class ContentTranslator {
  constructor(articles) {
    this.articles = articles;
    this.translatedArticles = [];
  }


  work(foreinContent) {
    return new Promise(function (resolve, reject) {
      translator('en', 'ru', foreinContent, ({ isCorrect, source }) =>
        isCorrect
          ? resolve(source.pronunciation[0])
          : reject()
      );
    });
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
        let header = await this.work(article.header);
        article.header = header.text;

        for (let j = 0; j < len; j++) {
          if (!paragraphs[j]) continue;
          let paragraph = await this.work(paragraphs[j]);
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


  async translate() {
    await this.googleTranslate();
    return this.translatedArticles;
  }
}
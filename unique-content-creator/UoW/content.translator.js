const
  request = require('request'),
  { config } = require('../../config');



module.exports = class ContentTranslator {
  constructor(articles) {
    this.articles = articles;
    this.translatedArticles = [];
  }


  yandexTranslate(foreinContent) {
    return new Promise(function (resolve, reject) {
      request({
        url: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${config.YANDEX_TRANSLATE_API_KEY}&text=${encodeURIComponent(foreinContent)}&lang=en-ru&format=plain`,
        method: 'GET',
        timeout: 10 * 1000
      }, function (error, response, body) {
        if (error) return reject(error);
        return resolve(JSON.parse(body).text[0]);
      });
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
        let header = await this.yandexTranslate(article.header);
        article.header = header;

        for (let j = 0; j < len; j++) {
          if (!paragraphs[j]) continue;
          let paragraph = await this.yandexTranslate(paragraphs[j]);
          paragraphs[j] = paragraph;
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
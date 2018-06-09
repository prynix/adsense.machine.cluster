module.exports = class AdsenseContentManager {

  get indexPageResponseBody() {
    const { title, description, info, articles } = this.site;
    return { title, description, info, articles };
  }

  get blogPageResponseBody() {
    const { title, articles } = this.site;
    return { title, articles };
  }

  get postPageResponseBody() {
    return {
      articles: []
    };
  }

  get randomPageResponseBody() {
    return {
      article: {
        pathname,
        header,
        img,
        categories,

        author,
        date,
        views,
        comments,

        paragraphs
      },
      categories,
      freshArticles,
      prev, next
    };
  }


  constructor(collection) {
    this.pullOutDataFromCollection(collection);
  }


  async pullOutDataFromCollection(collection) {
    this.site = await collection.findOne({});
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
module.exports = class AdsenseContentManager {

  get indexPageResponseBody() {
    const { title, description, info, articles } = this.site;
    return { title, description, info, articles };
  }

  get blogPageResponseBody() {
    const { title, articles, categories } = this.site;
    return { title, articles, categories };
  }

  get postPageResponseBody() {
    const { title, articles, categories } = this.site;
    return { title, articles, categories };
  }

  get randomPageResponseBody() {
    const
      { articles } = this.site,
      i = this.getRandomInt(0, articles.length - 1),
      prev = articles[i - 1],
      article = articles[i],
      next = articles[i + 1],
      navigation = {};

    if (prev) {
      navigation.prev = {
        href: prev.pathname,
        header: prev.header
      };
    }
    if (next) {
      navigation.next = {
        href: next.pathname,
        header: next.header
      };
    }
    return {
      ...this.postPageResponseBody,
      article,
      navigation
    };
  }


  constructor(collection) {
    this.pullOutDataFromCollection(collection);
  }


  async pullOutDataFromCollection(collection) {
    this.site = await collection.findOne({});
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
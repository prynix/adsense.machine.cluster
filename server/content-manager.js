module.exports = class AdsenseContentManager {

  get indexPageResponseBody() {
    const { title, description, info, advBlocks, articles } = this.site;
    return { title, description, info, advBlocks, articles };
  }

  get blogPageResponseBody() {
    const { title, articles, advBlocks, categories } = this.site;
    return { title, articles, advBlocks, categories };
  }

  get postPageResponseBody() {
    const { title, articles, advBlocks, categories } = this.site;
    return { title, articles, advBlocks, categories };
  }


  constructor(collection) {
    this.pullOutDataFromCollection(collection);
  }


  async pullOutDataFromCollection(collection) {
    this.site = await collection.findOne({});
  }

  getRandomArticleIndex() {
    return Math.floor(
      Math.random() * this.site.articles.length
    );
  }
}
module.exports = class AdsenseContentManager {

  get indexPageResponseBody() {
    const
      { title, description, info, advBlocks, articles } = this.site,
      posts = [...articles];
    return { title, description, info, advBlocks, articles: posts.splice(0, 5) };
  }

  get blogPageResponseBody() {
    const
      { title, articles, advBlocks, categories } = this.site,
      posts = [...articles];
    return { title, articles: posts.slice(0, 10), advBlocks, categories };
  }

  get postPageResponseBody() {
    const
      { title, articles, advBlocks, categories } = this.site,
      posts = [...articles];
    return { title, articles: posts.slice(0, 10), advBlocks, categories };
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
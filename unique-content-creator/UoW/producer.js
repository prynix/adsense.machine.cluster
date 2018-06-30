const
  SitesHunter = require('./hunters/sites'),
  ArticlesHunter = require('./hunters/articles'),
  ContentTranslator = require('./content.translator');



module.exports = class AdsenseContentProducer {
  constructor(site, db) {
    this.site = site;
    this.db = db;

    this.contentSitesURLs = [];
    this.paragraphs = [];
    this.articles = [];
  }


  async scrapeWebSites() {
    const sitesHunter = new SitesHunter(this.site.categories);
    this.contentSitesURLs = await sitesHunter.scrape();
  }

  async scrapeArticles() {
    const articlesHunter = new ArticlesHunter(
      this.contentSitesURLs,
      this.site.categories
    );
    this.articles = await articlesHunter.scrape();
  }

  async translateArticles() {
    const contentTranslator = new ContentTranslator(this.articles);
    this.articles = await contentTranslator.translate();
  }

  async saveArticles() {
    let notification = `\nsave content for ${this.site.domain} `;
    console.time(notification);
    const
      { site, articles } = this,
      collection = await this.db.collection(site.title);
    collection.insert({ ...site, articles });
    console.timeEnd(notification);
  }


  async produce() {
    console.info(`\nBuild content for  http://${this.site.domain}\n\n`);
    await this.scrapeWebSites();
    await this.scrapeArticles();
    await this.translateArticles();
    await this.saveArticles();
  }
}



process.on('uncaughtException', console.error);
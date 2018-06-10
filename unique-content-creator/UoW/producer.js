const
  fetch = require('./fetch'),
  SitesHunter = require('./sites.hunter'),
  ArticlesHunter = require('./articles.hunter'),
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
    const collection = await this.db.collection(this.site.title);
    console.info(collection);
    console.info(this.articles);
    // collection.insert(this.articles);
  }


  async  work() {
    console.log(`\n|> scrape sites`);
    await this.scrapeWebSites();
    console.log(`\n|> scrape articles`);
    await this.scrapeArticles();
    console.log(`\n|> translate articles`);
    await this.translateArticles();
    console.log(`\n|> save article`);
    await this.saveArticles();
  }
}
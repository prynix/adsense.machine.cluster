const
  fetch = require('./fetch'),
  SitesHunter = require('./sites.hunter'),
  ArticlesHunter = require('./articles.hunter');



module.exports = class AdsenseContentProducer {
  constructor(site) {
    this.site = site;
    this.contentSitesURLs = [];
    this.paragraphs = [];
    this.articles = [];
  }


  async scrapeWebSites() {
    const sitesHunter = new SitesHunter(this.site.categories);
    this.contentSitesURLs = await sitesHunter.scrape();
  }

  async scrapeArticles() {
    const articlesHunter = new ArticlesHunter(this.contentSitesURLs);
    this.articles = await articlesHunter.scrape();
  }

  async  work() {
    await this.scrapeWebSites();
    await this.scrapeArticles();
    // await this.translateContent();
  }
}
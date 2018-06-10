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


  async huntWebSitesForScrape() {
    const sitesHunter = new SitesHunter(this.site.categories);
    this.contentSitesURLs = await sitesHunter.work();
  }

  async huntArticles() {
    const articlesHunter = new ArticlesHunter(this.contentSitesURLs);
    this.articles = await articlesHunter.work();
  }

  async  work() {
    await this.huntWebSitesForScrape();
    await this.huntArticles();
    // await this.translateContent();
  }
}
const
  sites = require('../sites.json'),
  { config } = require('../config'),
  MongoDBManager = require('../database'),
  AdsenseContentProducer = require('./UoW/producer');



module.exports = class AdsenseUniqueContentCreator {
  constructor(sites, db) {
    this.sites = sites;
    this.db = db;
    this.needingContentSites = [];
  }


  async checkContentExistence() {
    const
      { sites } = this,
      { length } = sites,
      listCollections = await this.db.collections(),
      collections = this.getCollectionsNames(listCollections);
    for (let i = 0; i < length; i++) {
      const site = sites[i];
      if (!collections.includes(site.title)) {
        this.needingContentSites.push(site);
      }
    }
  }

  fill() {
    this
      .needingContentSites
      .forEach(site =>
        new AdsenseContentProducer(site, this.db).work()
      );
  }

  getCollectionsNames(listCollections) {
    const
      names = [],
      { length } = listCollections;
    for (let i = 0; i < length; i++) {
      names.push(listCollections[i].s.name);
    }
    return names;
  }


  static async main() {
    let
      mongo = new MongoDBManager(),
      db = await mongo.init(config.mongodb),
      contentCreator = new AdsenseUniqueContentCreator(sites, db);
    await contentCreator.checkContentExistence();
    contentCreator.fill();
  }
}
const
  { join } = require('path'),
  express = require('express'),
  AdsenseRouter = require('./router'),
  AdsenseContentManager = require('./content-manager');



module.exports = class AdsenseServer {
  constructor(domain, port, db) {
    this.domain = domain;
    this.port = port;
    this.db = db;
    this.app = express();
  }


  setup() {
    this.app.set("view engine", "pug");
    this.app.set("views", join(__dirname, '../', "views"));
    this.app.use(express.static('assets'));
  }

  async prepareContentManager() {
    const
      collection = this.db.collection(this.domain),
      contentManager = new AdsenseContentManager(collection);
    await contentManager.pullOutDataFromCollection();
    return contentManager;
  }

  async route() {
    const
      contentManager = await this.prepareContentManager(),
      router = new AdsenseRouter(this.app, contentManager);
    router.init();
  }

  listen() {
    const { app, port, domain } = this;
    app.listen(port, function () {
      console.log(`\n Adsense site  ${domain}  run on port  ${port}!`);
    });
  }


  async bootstrap() {
    this.setup();
    await this.route();
    this.listen();   
  }
}
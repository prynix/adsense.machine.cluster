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


  prepareContentManager() {
    const collection = this.db.collection(this.domain);
    return new AdsenseContentManager(collection)
  }

  setup() {
    this.app.set("view engine", "pug");
    this.app.set("views", join(__dirname, '../', "views"));
    this.app.use(express.static('assets'));
    return this;
  }

  route() {
    const
      contentManager = this.prepareContentManager(),
      router = new AdsenseRouter(this.app, contentManager);
    router.init();
    return this;
  }

  listen() {
    const { app, port, domain } = this;
    app.listen(port, function () {
      console.log(`\n Adsense site  ${domain}  run on port  ${port}!`);
    });
  }


  bootstrap() {
    this
      .setup()
      .route()
      .listen();
  }
}
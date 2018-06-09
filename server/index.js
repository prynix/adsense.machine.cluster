const
  { join } = require('path'),
  express = require('express'),
  AdsenseRouter = require('./router');



module.exports = class AdsenseServer {
  constructor(domain, port) {
    this.domain = domain;
    this.port = port;
    this.app = express();
  }
  /*
  *
  */
  setup() {
    this.app.set("view engine", "pug");
    this.app.set("views", join(__dirname, '../', "views"));
    this.app.use(express.static('assets'));
  }

  route() {
    new AdsenseRouter(this.app).setup();
  }

  listen() {
    const { app, port, domain } = this;
    app.listen(port, function () {
      console.log(`\n Adsense site  ${domain}  run on port  ${port}!`);
    });
  }
  /*
  *
  */
  bootstrap() {
    this.setup();
    this.route();
    this.listen();
  }
}
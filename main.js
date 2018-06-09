const
  cluster = require('cluster'),
  numCPUs = require('os').cpus().length,
  log4js = require('log4js'),
  AdsenseServer = require('./server'),
  MongoDBManager = require('./database'),
  { config } = require('./config'),
  sites = require('./sites.json'),
  { length } = sites;
let DBManager;
/*
*   todo error handling & notify
*/
module.exports = class AdsenseMachineApp {

  static initLogger() {
    log4js.configure(config.log4js);
    log4js.getLogger().setLevel('ERROR');
  }

  static async initDB() {
    DBManager = new MongoDBManager();
    await DBManager.init(config.mongodb);
  }

  static initClusterServers() {
    if (cluster.isMaster) {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      for (let i = 0; i < length; i++) {
        const { domain, port, advBlocks } = sites[i];
        console.log(domain, port);
        process.nextTick(function () {
          new AdsenseServer(domain, port, DBManager).bootstrap();
        });
      }
    }
  }


  static async main() {
    // AdsenseMachineApp.initLogger();
    await AdsenseMachineApp.initDB();
    AdsenseMachineApp.initClusterServers();
  }
}
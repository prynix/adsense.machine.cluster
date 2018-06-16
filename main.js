let
  cluster = require('cluster'),
  numCPUs = require('os').cpus().length,
  log4js = require('log4js'),
  AdsenseServer = require('./server'),
  MongoDBManager = require('./database'),
  sites = require('./sites.json'),
  { length } = sites,
  { config } = require('./config'),
  mongo, DB;



module.exports = class AdsenseMachineApp {

  static initLogger() {
    log4js.configure(config.log4js);
    log4js.getLogger().setLevel('ERROR');
  }

  static async initDB() {
    mongo = new MongoDBManager();
    DB = await mongo.init(config.mongodb);
  }

  static initClusterServers() {
    if (cluster.isMaster) {

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
      setTimeout(async () => await mongo.disconnect(), 30 * 1000);

    } else {

      for (let i = 0; i < length; i++) {
        const { title, port } = sites[i];
        process.nextTick(async function () {
          let adsenseServer = new AdsenseServer(title, port, DB);
          await adsenseServer.bootstrap();
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
exports.config = {
  mongodb: {
    uri: 'mongodb://127.0.0.1:27018/adsense',
    options: {
      poolSize: 10
    }
  },
  log4js: {
    appenders: [
      { type: 'console' },
      { type: 'file', filename: 'logs/server.log', 'maxLogSize': 102400, 'backups': 10 }
    ],
    replaceConsole: true
  }
};
exports.config = {
  mongodb: {
    uri: 'mongodb://127.0.0.1:27017/adsense',
    options: {
      poolSize: 15
    }
  },
  log4js: {
    appenders: [
      { type: 'console' },
      { type: 'file', filename: 'logs/server.log', 'maxLogSize': 102400, 'backups': 10 }
    ],
    replaceConsole: true
  },
  limits: {
    articles: 30,
    paragraphs: 10
  },
  YANDEX_TRANSLATE_API_KEY: 'trnsl.1.1.20180702T172344Z.01250754f2a93cfe.ba786da5f903c108ab3fe064c4e4fa1a42615888'
};
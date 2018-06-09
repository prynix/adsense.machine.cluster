const { MongoClient } = require('mongodb')
/*
*   @see
*   http://mongodb.github.io/node-mongodb-native/3.0/api/
*/
module.exports = class MongoDBManager {
  connect({ uri, options }) {
    return MongoClient.connect(uri, options);
  }

  async init(config) {
    const connection = await this.connect(config);
    return connection.db('adsense');
  }
}

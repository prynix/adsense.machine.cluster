const { MongoClient } = require('mongodb');
/*
*   @see
*   http://mongodb.github.io/node-mongodb-native/3.0/
*/
module.exports = class MongoDBManager {
  async connect({ uri, options }) {
    this.connection = await MongoClient.connect(uri, options);
    console.info('\nMongoDBManager connected\n');
  }

  async disconnect() {
    await this.connection.close();
    console.info('\n\nMongoDBManager disconnected\n');
  }


  async init(config) {
    await this.connect(config);
    return this.connection.db('adsense');
  }
}

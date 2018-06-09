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
    const db = await this.connect(config);
    this.db = db;
  }

  getAllArticles(site) {
    return this.db.collection(site);
  }

  getAllPages(site) {
    return this.db.collection(site);
  }

  connect() {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var query = { address: "Park Lane 38" };
      dbo.collection("customers").find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });
    });
  }
}

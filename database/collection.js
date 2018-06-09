const { ObjectID } = require('mongodb');



module.exports = class MongoCollection {
  constructor(collection) {
    this.collection = collection;
  }

  insert(doc) {
    return new Promise((resolve, reject) => {
      this.collection.insert(doc, (err, docs) => {
        return err ? reject(err) : resolve(docs);
      });
    });
  }

  save(doc) {
    return new Promise((resolve, reject) => {
      this.collection.save(doc, (err, docs) => {
        return err ? reject(err) : resolve(docs);
      });
    });
  }

  find(query, fields, options) {
    return new Promise((resolve, reject) => {
      this.collection.find(query, fields, options).toArray((err, docs) => {
        return err ? reject(err) : resolve(docs);
      });
    });
  }

  findOne(query, fields, options) {
    return new Promise((resolve, reject) => {
      this.collection.findOne(query, fields, options, (err, document) => {
        return err ? reject(err) : resolve(document);
      });
    });
  }

  count(query) {
    return new Promise((resolve, reject) => {
      this.collection.find(query).count((err, count) => {
        return err ? reject(err) : resolve(count);
      });
    });
  }

  findOneByDocumentId(id) {
    return this.findOne({ _id: new ObjectID(id) });
  }

  updateOne(query, fields, options) {
    return new Promise((resolve, reject) => {
      this.collection.updateOne(query, fields, options, (err, docs) => {
        return err ? reject(err) : resolve(docs);
      });
    });
  }
}
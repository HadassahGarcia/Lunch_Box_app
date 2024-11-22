const initDB = require('../database')

class HistoryModel {
  static async get () {
    const client = await initDB()
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('history')

    const history = await collection.find({}).toArray()
    return history
  }

  static async store (cart) {
    const client = await initDB()
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('history')

    // Insert
    await collection.insertOne({
      timeStored: new Date(),
      cart
    })
  }
}

module.exports = HistoryModel

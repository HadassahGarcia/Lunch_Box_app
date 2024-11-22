const initDB = require('../database')

class CartModel {
  static async deleteAll () {
    const client = await initDB()
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('cart')
    await collection.deleteMany({})
  }

  static async store (cart) {
    await this.deleteAll()

    const client = await initDB()
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('cart')

    // Insert
    await collection.insertOne({
      timeStored: new Date(),
      cart
    })
  }

  static async get () {
    const client = await initDB()
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('cart')

    const cart = await collection.findOne({})
    return cart
  }
}

module.exports = CartModel

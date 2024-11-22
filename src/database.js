const { app } = require('electron')
const fs = require('fs')
const { MongoClient } = require('mongodb')
const path = require('path')

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017`

const initDB = () => {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(uri)
    await client.connect()
    resolve(client)
  })
}

initDB()
  .then(async (client) => {
    console.log('Connected to MongoDB')
    const db = client.db(process.env.DB_NAME)

    // Preload data
    if ((await db.listCollections().toArray()).length === 0) {
      // List all collections
      fs.readdirSync(path.join(app.getAppPath(), 'preload')).forEach(file => {
        const collectionName = file.split('.')[0]

        // Get collection
        const data = JSON.parse(fs.readFileSync(path.join(app.getAppPath(), 'preload', file), 'utf8'))

        // Insert data
        db.collection(collectionName).insertMany(data)
      })
    }
  })

module.exports = initDB

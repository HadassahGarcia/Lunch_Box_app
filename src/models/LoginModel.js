const initDB = require('../database')

class LoginModel {
  static async login (email, password) {
    const client = await initDB()
    const db = client.db(process.env.DB_NAME)
    const collection = db.collection('users')
    const user = await collection.findOne({ email })
    const status = {
      isValid: false,
      isAdmin: false
    }
    if (user && user.password === password) {
      status.isValid = true
      status.isAdmin = user.isAdmin
    }

    return status
  }
}

module.exports = LoginModel

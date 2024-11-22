const HistoryModel = require('../models/HistoryModel')
const CartModel = require('../models/CartModel')

class HistoryController {
  static async store (req, res) {
    // Validate
    if (!req.body.data) {
      return res.status(400).json({ error: 'Missing data' })
    }

    // Store
    try {
      await HistoryModel.store(req.body.data)
    } catch (error) {
      return res.status(500).json({ error: 'History not stored' })
    }

    // Delete cart
    try {
      await CartModel.deleteAll()
    } catch (error) {
      return res.status(500).json({ error: 'Cart not deleted' })
    }

    // Redirect
    res.json({ message: 'History stored' })
  }

  static async get (req, res) {
    res.json(await HistoryModel.get())
  }
}

module.exports = { HistoryController }

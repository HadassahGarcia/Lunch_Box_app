const CartModel = require('../models/CartModel')

class CartController {
  static async store (req, res) {
    // Validate
    if (!req.body.data) {
      return res.status(400).json({ error: 'Missing data' })
    }

    if (req.body.data.length === 0) {
      return res.status(400).json({ error: 'No items in cart' })
    }

    // Store
    try {
      await CartModel.store(req.body.data)
    } catch (error) {
      return res.status(500).json({ error: 'Cart not stored' })
    }

    // Redirect
    res.json({ message: 'Cart stored' })
  }

  static async delete (req, res) {
    try {
      await CartModel.deleteAll()
    } catch (error) {
      return res.status(500).json({ error: 'Cart not deleted' })
    }

    // Redirect
    res.json({ message: 'Cart deleted' })
  }

  static async get (req, res) {
    res.json(await CartModel.get())
  }
}

module.exports = { CartController }

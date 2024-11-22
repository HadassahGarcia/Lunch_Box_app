const LoginModel = require('../models/LoginModel')

class LoginController {
  static async login (req, res) {
    // Validate input
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Missing credentials' })
    }

    // Validate credentials
    const { isValid, isAdmin } = await LoginModel.login(req.body.email, req.body.password)

    // Redirect to home page
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    if (isAdmin) {
      res.json({ message: 'Login successful', redirect: 'admin.html' })
    } else {
      res.json({ message: 'Login successful', redirect: 'home.html' })
    }
  }
}

module.exports = { LoginController }

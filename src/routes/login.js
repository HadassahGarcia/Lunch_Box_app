const express = require('express')
const path = require('path')
const router = express.Router()

const { LoginController } = require(path.join(__dirname, '../controllers/LoginController.js'))

router.post('/', LoginController.login)

module.exports = router

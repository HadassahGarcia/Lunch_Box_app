const express = require('express')
const path = require('path')
const router = express.Router()

const { CartController } = require(path.join(__dirname, '../controllers/CartController.js'))

router.get('/', CartController.get)
router.post('/', CartController.store)

module.exports = router

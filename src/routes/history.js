const express = require('express')
const path = require('path')
const router = express.Router()

const { HistoryController } = require(path.join(__dirname, '../controllers/HistoryController.js'))

router.get('/', HistoryController.get)
router.post('/', HistoryController.store)

module.exports = router

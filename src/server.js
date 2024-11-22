require('./database')

const { app } = require('electron')
const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000

const initServer = (server) => {
  return new Promise((resolve) => {
    // Middlewares
    server.use(express.urlencoded({ extended: false }))
    server.use(express.json())

    server.use('/public', express.static(path.join(app.getAppPath(), 'public')))

    // Routes
    server.use('/login', require(path.join(__dirname, 'routes/login')))
    server.use('/cart', require(path.join(__dirname, 'routes/cart')))
    server.use('/history', require(path.join(__dirname, 'routes/history')))

    resolve(server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`)
    }))
  })
}

module.exports = initServer

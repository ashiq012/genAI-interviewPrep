const express = require('express')
const app = express()

//db require and db call
const DB = require('..//config/database')
DB();
app.use(express.json())

//require all the routes
const router = require('../routes/auth')
app.use("/api/auth",router)

module.exports = app
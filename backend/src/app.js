const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
//db require and db call
const DB = require('..//config/database')
DB();
app.use(express.json())
app.use(cookieParser())

//require all the routes
const router = require('../routes/auth')
app.use("/api/auth",router)

module.exports = app
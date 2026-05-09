const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
//db require and db call
const DB = require('..//config/database')
DB();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const _dirname = path.resolve()

//require all the routes
const router = require('../routes/auth')
const interviewRouter= require('../routes/interview.routes')
app.use("/api/auth",router)
app.use("/api/interview",interviewRouter)

app.use(express.static(path.join(_dirname, '/frontend/dist')))
app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'))
})

module.exports = app
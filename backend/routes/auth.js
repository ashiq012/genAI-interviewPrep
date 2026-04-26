const express = require('express')
const router = express.Router();
const {registerUser, login, logout, getMe} = require("../controller/auth.controller");
const GetLoggedInUser = require('../middleware/auth');

router.post('/register',registerUser)
router.post('/login',login)
router.get('/logout',logout)
router.get('/getme',GetLoggedInUser,getMe);
module.exports=router
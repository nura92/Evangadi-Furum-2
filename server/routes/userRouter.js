const express = require('express')
const router = express.Router()
const authMidlleware = require('../middleware/authMiddleware')
//user controller
const { register, login, checkuser ,getalluser} = require('../controller/useController')

// register routes
router.post('/register',register)

//login routes
router.post('/login',login)

//check route
router.get('/check',authMidlleware,checkuser)

//get all users
router.get('/getusers',getalluser)
module.exports = router
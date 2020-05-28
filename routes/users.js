const express = require("express")
const router = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

//const User = require('../models/user')


const userController = require("../controllers/user")



router.post("/register", userController.Register);

router.post("/login", userController.Login);

module.exports = router;
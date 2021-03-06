const express = require("express");
const router = express.Router();
const auth = require("../middleWare/auth");

//const User = require('../models/user')

const userController = require("../controllers/user");

router.post("/register", userController.Register);

router.post("/login", userController.Login);

router.post("/profile", userController.Profile);

router.get("/user", userController.User);

router.get("/check", auth, userController.checkState);

router.get("/checkAdminStatus", auth, userController.checkAdminState);

// router.post("/selling-register", auth, userController.sellingRegister);

router.get("/get-orders", auth, userController.getOrders);

router.get("/get-all-orders", auth, userController.getAllOrders);

module.exports = router;

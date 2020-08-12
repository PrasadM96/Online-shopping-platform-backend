const express = require("express");

const router = express.Router();

const auth = require("../middleWare/auth");

const sellerController = require("../controllers/seller");

router.post("/selling-register", auth, sellerController.postSellerRegister);

module.exports = router;

const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.post("/post-product", shopController.postAddProduct);

module.exports = router;

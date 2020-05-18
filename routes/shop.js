const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.post("/post-product", shopController.postAddProduct);

router.get("/get-selling-products", shopController.getProducts);

router.post("/delete-selling-item", shopController.postDelete);

module.exports = router;

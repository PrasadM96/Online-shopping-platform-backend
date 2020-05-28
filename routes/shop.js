const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.post("/post-product", shopController.postAddProduct);

router.get("/get-selling-products", shopController.getSellingProducts);

router.post("/delete-selling-item", shopController.postSellingDelete);

router.get("/get-all-products", shopController.getAllProducts);

module.exports = router;

const express = require("express");
//const auth = require("../middleWare/auth");

const shopController = require("../controllers/shop");

const router = express.Router();

router.post("/post-product", shopController.postAddProduct);

router.get("/get-selling-products", shopController.getSellingProducts);

router.post("/delete-selling-item", shopController.postSellingDelete);

router.get("/get-all-products", shopController.getAllProducts);

router.get("/buy", shopController.butNow);

router.post("/search", shopController.getSearchReuslts);

module.exports = router;

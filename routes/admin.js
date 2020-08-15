const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/get-products", adminController.getProducts);

router.get("/get-users",adminController.getUsers);
router.get("/get-productlist",adminController.getProductList);
router.get("/get-sellerlist",adminController.getSellerList);

module.exports = router;

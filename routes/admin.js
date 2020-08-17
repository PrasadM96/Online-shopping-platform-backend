const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/get-products", adminController.getProducts);

router.get("/get-users",adminController.getUsers);
router.get("/get-productlist",adminController.getProductList);
router.get("/get-sellerlist",adminController.getSellerList);
router.get("/get-orders",adminController.getOrders);
router.get("/get-productCount",adminController.getProductCount);
router.get("/get-userCount",adminController.getUserCount);
router.get("/get-sellerCount",adminController.getSellerCount);
router.get("/get-orderCount",adminController.getOrderCount);
router.post("/remove-sellers",adminController.removeSellers);
router.post("/remove-users",adminController.removeUsers);


module.exports = router;

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/get-products", adminController.getProducts);

module.exports = router;

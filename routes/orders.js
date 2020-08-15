const express = require("express");

const orderController = require("../controllers/orders");

const auth = require("../middleWare/auth");

const router = express.Router();

router.post("/post-order", auth, orderController.postOrder);

module.exports = router;

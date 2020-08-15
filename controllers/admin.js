
const User = require("../models/user");
const Product = require("../models/products");
const Seller = require("../models/seller");

exports.getProducts = (req, res, next) => {
  res.status(200).json("Success");
};

exports.getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!users.length) {
          return res
              .status(404)
              .json({ success: false, error: `users not found` })
      }
      return res.status(200).json({ success: true, data: users })
  }).catch(err => console.log(err))
}

exports.getProductList = async (req, res) => {
  await Product.find({}, (err, products) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!products.length) {
          return res
              .status(404)
              .json({ success: false, error: `products not found` })
      }
      return res.status(200).json({ success: true, data: products })
  }).catch(err => console.log(err))
}

exports.getSellerList = async (req, res) => {
  await Seller.find({}, (err, sellers) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!sellers.length) {
          return res
              .status(404)
              .json({ success: false, error: `sellers not found` })
      }
      return res.status(200).json({ success: true, data: sellers })
  }).catch(err => console.log(err))
}
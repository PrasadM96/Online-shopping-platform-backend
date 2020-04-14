const Products = require("../models/products");

exports.postAddProduct = (req, res, next) => {
  const product = new Products({
    title: req.body.title,
    category: req.body.category,
    subCategory: req.body.subCategory,
    condition: req.body.condition,
    description: req.body.description,
    sellingArea: req.body.sellingArea,
    price: req.body.price,
    shippingFee: req.body.shippingFee,
    imageUrls: req.body.files,
    userId: req.user._id,
  });
  product
    .save()
    .then((result) => {
      console.log("created success");
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

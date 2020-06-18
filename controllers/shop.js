const Products = require("../models/products");

exports.postAddProduct = (req, res, next) => {
  var arr;
  if (req.files.length > 0) {
    arr = req.files.map((file) => {
      return "http://localhost:5000/" + file.path;
    });
  }

  console.log(req.body);
  console.log(req.files);

  const product = new Products({
    title: req.body.title,
    category: req.body.category,
    subCategory: req.body.subCategory,
    condition: req.body.condition,
    description: req.body.description,
    sellingArea: req.body.sellingArea,
    quantity: req.body.quantity,
    price: req.body.price,
    shippingFee: req.body.shippingFee,
    imageUrls: arr,
    userId: "5e89116d64547e20500fba3a",
  });

  product
    .save()
    .then((result) => {
      console.log("created success");
      // res.status(200).send(result);
      res.redirect("/selling/my-items");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getSellingProducts = (req, res, next) => {
  Products.find({ userId: req.user._id })
    .populate("userId", "email")
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.postSellingDelete = (req, res, next) => {
  const prodId = req.body.prodId;

  Products.deleteOne({
    _id: prodId,
    userId: req.user._id,
  })
    .then((response) => {
      res.status(200).send("success");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////////////
exports.getAllProducts = (req, res, next) => {
  var category = req.query.category;
  category = category.charAt(0).toUpperCase() + category.slice(1);
  console.log(category);

  Products.find({ category: category })
    //.populate("userId")
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.butNow = (req, res, next) => {
  Products.find({ userId: "5e89116d64547e20500fba3a" })
    .then((user) => {
      console.log(user);
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
      });
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

////////////////////////////////////////////////////////
exports.getSearchReuslts = (req, res, next) => {
  var keyword = req.body.keyword;
  console.log(keyword);

  Products.find({
    $or: [
      {
        title: new RegExp(keyword, "i"),
      },
      { category: new RegExp(keyword, "i") },
      { subCategory: new RegExp(keyword, "i") },
    ],
  })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getSingleProduct = (req, res, next) => {
  const id = req.query.id;
  Products.find({ _id: id })
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

const Products = require("../models/products");

const { count } = require("../models/products");

exports.postAddProduct = (req, res, next) => {
  var arr;
  if (req.files.length > 0) {
    arr = req.files.map((file) => {
      return file.path;
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
    userId: req.user._id,
  });

  product
    .save()
    .then((result) => {
      console.log("created success");
      res.status(200).send(result);
      // res.redirect("/selling/my-items");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.getSellingProducts = (req, res, next) => {
  Products.find({ userId: req.user._id })
    // .populate("userId", "email")
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

exports.updateSellingItem = (req, res, next) => {
  var arr = [];

  if (req.files.length > 0) {
    arr = req.files.map((file) => {
      return file.path;
    });
  }

  if (req.body.fileUrls) {
    if (Array.isArray(req.body.fileUrls)) {
      req.body.fileUrls.map((element) => {
        arr.push(element);
      });
    } else {
      arr.push(req.body.fileUrls);
    }
  }
  console.log(arr);

  Products.findById(req.body.id)
    .then((product) => {
      product.title = req.body.title;
      product.category = req.body.category;
      product.subCategory = req.body.subCategory;
      product.condition = req.body.condition;
      product.description = req.body.description;
      product.sellingArea = req.body.sellingArea;
      product.quantity = req.body.quantity;
      product.price = req.body.price;
      product.shippingFee = req.body.shippingFee;
      product.imageUrls = arr;

      return product.save();
    })
    .then((result) => {
      console.log("success");
      res.json({ msg: "update success", result: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
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

///////////////////////////////////////////////////cart/////////////////////////////////////
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  var result = null;
  let productItem = null;
  Products.findById(prodId)
    .then((product) => {
      if (!product) {
        const error = new Error("No item found");
        error.statusCode = 404;
        throw error;
      }

      if (product.quantity === 0) {
        const error = new Error("No enough items. Try again later!");
        error.statusCode = 400;
        throw error;
      }

      product.quantity = product.quantity - 1;
      productItem = product;
      return product.save();
    })
    .then((result) => {
      return req.user.addToCart(productItem);
    })
    .then((result) => {
      res.json({ result: result, message: "add to cart success!" });
    })
    .catch((err) => {
      console.log("add to cart error");
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postCartRemoveProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const itemCount = req.body.itemCount;

  Products.findById(prodId)
    .then((product) => {
      product.quantity = product.quantity + parseInt(itemCount);
      return product.save().then((result) => {
        return req.user.removeFromCart(prodId);
      });
    })
    .then((result) => {
      console.log("success remove");
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({
        error: {
          message: "Remove Item failed",
        },
      });
    });
};

exports.postDeleteCart = (req, res, next) => {
  const cartItemArr = req.body.cartItemArr;
  // cartItemArr.forEach((item) => {
  //   console.log(item);
  //   Products.findById(item.id)
  //     .then((product) => {
  //       product.quantity = product.quantity + parseInt(item.itemCount);
  //       return product.save();
  //     })
  //     .catch((err) => {
  //       return res
  //         .status(400)
  //         .json({ error: { message: "Clear cart Failed" } });
  //     });
  // });

  req.user
    .clearCart()
    .then((result) => {
      res.json({ message: "success", result: result });
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.postUpdateCart = (req, res, next) => {
  const prodId = req.body.productId;
  const amount = req.body.newAmount;
  const cart = req.user.cart.items;
  console.log(cart);

  var cartQuantity = null;
  const cartIndex = cart.findIndex((cp) => {
    console.log(cp.productId, prodId);

    return cp.productId.toString() == prodId.toString();
  });

  if (cartIndex >= 0) {
    cartQuantity = cart[0].quantity;
  }

  Products.findById(prodId)
    .then((product) => {
      if (
        (product.quantity == 0 && parseInt(amount) == -1) ||
        (cartQuantity == 1 && parseInt(amount) == -1) ||
        (cartQuantity == product.quantity && parseInt(amount) == 1)
      ) {
        return res.status(400).json({
          error: {
            message: "You can't change item count any more!",
          },
        });
      } else {
        product.quantity = product.quantity - parseInt(amount);
        return product.save().then((result) => {
          return req.user.updateCart(prodId, amount);
        });
      }
    })

    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.getCart = (req, res, next) => {
  const cartItems = req.user.cart;
  const id = cartItems.items.map((i) => {
    return i.productId;
  });

  Products.find({ _id: { $in: id } })
    .then((result) => {
      var arr = result.map((item, idx) => {
        item.cartItemCount = 45;
        //console.log(item);
        return item;
      });

      // console.log((arr[0].cartItemCount = 23));
      console.log(arr);

      res.status(200).json({ cartArr: arr, count: cartItems });
    })
    .catch((err) => {
      console.log(err);
    });
};

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");

//user model

const User = require("../models/user");
const Product = require("../models/products");
const Seller = require("../models/seller");
const Orders = require("../models/orders");

process.env.SECRET_KEY = "secret";

exports.create = async (product) => {
  if (!product) throw new Error("Missing product");

  await Product.create(product);
};

exports.Register = (req, res, next) => {
  //get api/users
  //@desc register user
  //@access public

  const { first_name, last_name, email, password } = req.body;
  const sellerStatus = false;
  const status = false;
  //simple validation
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ msg: "Please anter all fiels" });
  }

  //check for exiting user
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exits" });
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      sellerStatus,
      status,
    });

    //create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 60 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
};

exports.Login = (req, res, next) => {
  const { email, password } = req.body;

  //get user cunt
  let userCount = 0;

  User.countDocuments({}, function (err, count) {
    if (err) {
      console.log(err);
    } else {
      userCount = count;
    }
  });
  //get product count
  let productCount = 0;

  Product.countDocuments({}, function (err, count) {
    if (err) {
      console.log(err);
    } else {
      productCount = count;
    }
  });

  //sellercount
  let sellerCount = 0;

  Seller.countDocuments({}, function (err, count) {
    if (err) {
      console.log(err);
    } else {
      sellerCount = count;
    }
  });

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for exiting user
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(401).json({ msg: "User does not exits" });
    }
    /*const status = 0//for user
    if(user.email == "sakuni@gmail.com"){
     status =1
     
    }*/

    //compare
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid password or email" });
      }

      const expiresIn = 3600;
      if (user.status == false) {
        jwt.sign(
          { id: user.id },

          config.get("jwtSecret"),
          { expiresIn: expiresIn },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token,
              user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                sellerStatus: user.sellerStatus,
                expiresIn: expiresIn,
                status: user.status,
              },
            });
          }
        );
      } else {
        jwt.sign(
          { id: user.id },

          config.get("jwtSecret"),
          { expiresIn: expiresIn },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                sellerStatus: user.sellerStatus,
                expiresIn: expiresIn,
                status: user.status,
                first_name: user.first_name,
              },
              userCount,
              productCount,
              sellerCount,
            });
          }
        );
        console.log("hii admin");
      }
    });
  });
};

exports.User = (req, res, next) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};

exports.checkState = (req, res, next) => {
  User.findById(req.user._id)
    .select("sellerStatus")
    .then((result) => {
      return res.json({ sellerStatus: result });
    })
    .catch((error) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.Profile = (req, res, next) => {
  const profileData = new User({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    province: req.body.province,
  });
  /*
          profileData.update()
          
              console.log("created success");
              res.status(200).send("success");
      }})
            .catch((err) => {
              console.log("error")
              res.status(400).send(err);
            });
        }
     */

  console.log(req.body.user_id);

  User.findByIdAndUpdate(
    req.body.user_id,
    {
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      province: req.body.province,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        //console.log(result.first_name);
        //console.log(profileData)
        res.send(profileData);
      }
    }
  );
};

exports.checkAdminState = (req, res, next) => {
  let s= null;
  User.findById(req.user._id)
    .select("status")
    .then((result) => {
      console.log(result);
      return res.json({ status: result });
    })
    .catch((error) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getOrders =(req,res,next)=>{
Orders.find({userId:req.user._id})
  .then((result)=>{
    return res.status(200).json({success:true,data:result});
  })
  .catch((err)=> {
    if(!err.statusCode){
      err.statusCode=500;
        }
        next(err);
  })

  

;
}


const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");

//user model

const User = require("../models/user");

process.env.SECRET_KEY = "secret";
exports.Register = (req, res, next) => {
  //get api/users
  //@desc register user
  //@access public

  const { first_name, last_name, email, password } = req.body;

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

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please anter all fiels" });
  }

  //check for exiting user
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exits" });
    }

    //compare
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password or email" });
      }

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
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
};

exports.User = (req, res, next) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
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

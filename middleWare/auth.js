const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //chck for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //add user from payload
    console.log(decoded);
    User.findById(decoded.id)
      .then((user) => {
        req.user = user;
        // console.log(req.user);
        next();
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }

  //verify token
}
module.exports = auth;

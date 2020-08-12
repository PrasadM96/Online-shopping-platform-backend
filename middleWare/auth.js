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

    User.findById(decoded.id)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    err.message = "Token Not Valid";
    next(err);
  }

  //verify token
}
module.exports = auth;

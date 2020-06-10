const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(401).send("Authorization denied");
  }

  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(400).send("Token is not valid");
    }
    //req.user = decoded;
    next();
  });
};

module.exports = auth;

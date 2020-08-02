const User = require("../models/user");
const Seller = require("../models/seller");

exports.postSellerRegister = (req, res, next) => {
  const { name, address, city, state, zip, teleNumber, country } = req.body;
  const seller = new Seller({
    name: name,
    address: address,
    city: city,
    state: state,
    zip: zip,
    teleNumber: teleNumber,
    country: country,
  });

  req.user
    .updateOne({ sellerStatus: true })
    .then((result) => {
      //   res.json({ meesage: "succeded", result: result });
      return seller.save();
    })
    .then((seller) => {
      res.json({ message: "succeded", result: seller });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new Schema({
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  address1: {
    type: String,
    required: false,
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  province: {
    type: String,
    required: false,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: false,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("user", userShema);

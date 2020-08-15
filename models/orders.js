const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      details: {
        firstname: {
          type: String,
          required: true,
        },
        lastname: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        province: {
          type: String,
          required: true,
        },
        zipCode: {
          type: Number,
          required: true,
        },
        teleNumber: {
          type: String,
          required: true,
        },
      },
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);

const Order = require("../models/orders");
const stripe = require("stripe")(
  "sk_test_51HGIUnB9kGdqbOgcC7Q3Pc9EnCRKLOybW4lE2DtaFCZznO5T0LO7KXOVlZQ4NmcGjRGYn9pu1NOMv6LynUenHfSD003tYldrvI"
);
const { v4: uuidv4 } = require("uuid");

exports.create = async (order) => {
  if (!order) throw new Error("Missing order");

  await Order.create(order);
};

exports.postOrder = async (req, res, next) => {
  console.log(req.body);

  const {
    stripeToken,
    userId,
    firstname,
    lastname,
    province,
    country,
    zipCode,
    teleNumber,
    items,
    totalPrice,
  } = req.body.order;

  const order = new Order({
    user: {
      userId: userId,
      details: {
        firstname: firstname,
        lastname: lastname,
        country: country,
        province: province,
        zipCode: zipCode,
        teleNumber: teleNumber,
      },
    },
    items: items,
    totalPrice: totalPrice,
  });

  let error;
  let status;
  try {
    const customer = await stripe.customers.create({
      email: stripeToken.email,
      source: stripeToken.id,
    });

    const idempotencyKey = uuidv4();

    const charge = await stripe.charges.create(
      {
        amount: totalPrice * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: stripeToken.email,
        description: `Paid for order`,
      },
      {
        idempotencyKey,
      }
    );
    console.log("Charge:", { charge });
    status = "success";

    const orderStatus = await order.save();

    return res.json({ message: "success", result: orderStatus });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    err.message = "Order Failed";
    next(err);
  }

  // const idempotency_key = uuidv4();

  // stripe.customers
  //   .create({
  //     email: stripeToken.email,
  //     source: stripeToken.id,
  //   })
  //   .then((res) => {
  //     console.log(res);
  //     return stripe.charges.create(
  //       {
  //         amount: totalPrice,
  //         currency: "usd",
  //         customer: res.id,
  //         receipt_email: stripeToken.email,
  //         description: `Pre Payment`,
  //       },
  //       {
  //         idempotency_key,
  //       }
  //     );
  //   })
  //   .then((res) => {
  //   return order.save();
  // })
  // .then((result) => {
  //   res.json({ message: "success", result: result });
  // })
  // .catch((err) => {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // });
};

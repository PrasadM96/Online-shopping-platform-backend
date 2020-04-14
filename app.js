const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./models/user");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

//routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//error controllers
const errcontroller = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  User.findById("5e89116d64547e20500fba3a")
    .then((user) => {
      req.user = user;
      // console.log(req.user);
      next();
    })
    .catch((err) => {
      console.log("error");
    });
});

//admin routes
app.use("/admin", adminRoutes);

//shop routes
app.use("/shop", shopRoutes);

//404 error
app.use(errcontroller.get404);

mongoose
  .connect(
    "mongodb+srv://user:user@cluster0-kiwz1.mongodb.net/online-shopping?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "John",
          email: "john@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
      console.log(
        "connected-----------------------------------------------------"
      );
    });
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });

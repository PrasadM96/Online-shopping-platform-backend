const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

const MONGODB_URL =
  "mongodb+srv://user:user@cluster0-kiwz1.mongodb.net/online-shopping";

// const store = new MongoDBStore({
//   uri: MONGODB_URL,
//   collection: "sessions",
// });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/users");

//error controllers
const errcontroller = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "my secret",
//     cookie: {
//       cookie: { maxAge: 2628000000 },
//     },
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => console.log(err));
// });
/*
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
*/
//admin routes
app.use("/admin", adminRoutes);

//shop routes
app.use("/shop", shopRoutes);

//user routes
app.use("/user", userRoutes);

//404 error
app.use(errcontroller.get404);

mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true })
  .then(() =>
    console.log(
      "connected-----------------------------------------------------"
    )
  )
  .catch((err) => console.log(err));

app.listen(5000);

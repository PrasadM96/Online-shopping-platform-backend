const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


//const User = require("./routes/Users");



const app = express();

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

/*app.use((req, res, next) => {
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
  .connect(
    "mongodb+srv://user:user@cluster0-kiwz1.mongodb.net/online-shopping?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => 
      console.log("connected-----------------------------------------------------"))
  .catch(err => console.log(err))

  

  app.listen(5000);
  

  



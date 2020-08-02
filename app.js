const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

const MONGODB_URL =
  "mongodb+srv://user:user@cluster0.uwoz0.mongodb.net/online-shopping";
// "mongodb+srv://user:user@cluster0-kiwz1.mongodb.net/online-shopping";

app.use(cors());

//routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/users");
const sellerRoutes = require("./routes/seller");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4().toString().replace(/-/g, "_") + "_" + file.originalname);
    // uuidv4().toString().replace(/-/g, "_") + "_" +
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//error controllers
const errcontroller = require("./controllers/error");
const { ppid } = require("process");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({
    storage: fileStorage /* dest: "images"*/,
    fileFilter: fileFilter,
  }).array("file", 12)
);

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

//admin routes
app.use("/admin", adminRoutes);

//shop routes
app.use("/shop", shopRoutes);

//user routes
app.use("/user", userRoutes);

//seller routes
app.use("/seller", sellerRoutes);

//404 error
app.use(errcontroller.get404);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.log(
      "connected-----------------------------------------------------"
    )
  )
  .catch((err) => console.log(err));

app.listen(5000);

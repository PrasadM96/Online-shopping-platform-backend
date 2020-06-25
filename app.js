const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const User = require("./models/user");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(cors());


//routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4().toString().replace(/-/g, "_") + "_" + file.originalname);
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({
    storage: fileStorage /* dest: "images"*/,
    fileFilter: fileFilter,
  }).array("file", 12)
);

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));


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

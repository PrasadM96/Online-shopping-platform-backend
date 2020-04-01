const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//routes
const adminRoutes = require("./routes/admin");

//controllers
const errcontroller = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/admin", adminRoutes);

//404 error
app.use(errcontroller.get404);

app.listen(3001);

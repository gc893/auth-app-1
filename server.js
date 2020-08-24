const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

// load the env vars
require("dotenv").config();

// create the Express app
const app = express();

// connect to the MongoDB with mongoose
require("./config/database");

// require our routes
const indexRoutes = require("./routes/index");
const studentsRoutes = require("./routes/students");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mount all routes with appropriate base paths
app.use("/", indexRoutes);
app.use("/students", studentsRoutes);

// invalid request, send 404 page
app.use(function (req, res) {
  res.status(404).send("Cant find that!");
});

module.exports = app;

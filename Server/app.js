require("dotenv").config();
const expresss = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2tfmflc.mongodb.net/${process.env.DB_DATABASE}`;

const app = expresss();

// app.use(bodyParser.urlencoded()) x-www-form-urlencoded <form>
app.use(bodyParser.json()); //application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Solving the CORS error. *(wildcard)all it allows access from anywhere.
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

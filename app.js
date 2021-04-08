const express = require("express");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

// middlewares
app.use(express.json());

// connect to Mongodb
mongoose
   .connect(process.env.DB_CONNECT, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log("Connected to the database");
   })
   .catch((err) => {
      console.log(err);
   });

// Routes
app.use("/user", authRoute);
app.use("/post", postRoute);

// start server
app.listen(4000, () => {
   console.log("Now listening on port 4000");
});

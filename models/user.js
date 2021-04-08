const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         min: 3,
      },
      email: {
         type: String,
         required: true,
         min: 7,
         max: 30,
      },
      password: {
         type: String,
         required: true,
         max: 1024,
         min: 5,
      },
   },
   { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

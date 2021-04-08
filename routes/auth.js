const express = require("express");
const userSchema = require("../models/user");
const { registerValidation, loginValidation } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// validation

router.post("/register", async (req, res) => {
   const { error } = registerValidation(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const existingUser = await userSchema.findOne({ email: req.body.email });
   if (existingUser) {
      return res
         .status(400)
         .send(`User with the email: ${req.body.email}, already exists.`);
   }

   //  hashing the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const user = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
   });
   try {
      const result = await user.save();
      res.send({ user: result.id });
   } catch (error) {
      res.status(400).send(error);
   }
});

// Login route
router.post("/login", async (req, res) => {
   const { error } = loginValidation(req.body);
   if (error) {
      return res.status(400).send(error.details[0].message);
   }

   const userExist = await userSchema.findOne({ email: req.body.email });
   if (!userExist) {
      return res.status(400).send("Invalid username or password");
   }

   const compare = await bcrypt.compare(req.body.password, userExist.password);
   if (!compare) {
      return res.status(400).send("Invalid username or password");
   }
   //  setting token
   const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);

   res.header("auth-token", token).send("token==> " + token);
});

module.exports = router;

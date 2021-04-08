const express = require("express");
const router = express.Router();
const verify = require("../routes/privateRoute");

router.get("/", verify, (req, res) => {
   res.send("A page for testing the protected routes");
});

module.exports = router;

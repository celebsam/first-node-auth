const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
   const token = req.header("auth-token");
   if (!token) {
      return res.status(401).send("Access denied");
   }
   try {
      const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verifiedToken;
      next();
   } catch (error) {
      res.status(400).send("invalid token");
   }
};

module.exports = verify;

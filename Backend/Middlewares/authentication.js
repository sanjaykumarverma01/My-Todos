const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(511).send("Pleases Login to access todos");
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(400).send("Pleases Login to access todos");
    } else {
      req.body.userId = decoded.email;
      next();
    }
  });
};

module.exports = { authentication };

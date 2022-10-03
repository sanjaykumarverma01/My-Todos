const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/user.model");

const userController = express.Router();

userController.post("/signup", async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  const isEmailPResent = await UserModel.findOne({ email });
  if (!isEmailPResent) {
    bcrypt.hash(password, 6, async (err, hash) => {
      if (err) {
        return res.status(500).send({ msg: "Error Occurred" });
      }
      const user = new UserModel({
        first_name,
        last_name,
        age,
        email,
        password: hash,
      });
      try {
        await user.save();
        return res.status(201).send({ msg: "Signup successful" });
      } catch (err) {
        return res.status(500).send({ msg: "Signup failed" });
      }
    });
  } else {
    res.send({
      msg: "Email already in use please use different email address or Login",
    });
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  const hash = user ? user.password : undefined;
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      return res.status(404).send({ msg: "User not found" });
    }
    if (result) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
      return res.status(200).send({ msg: "Login successful", token: token });
    } else {
      return res
        .status(401)
        .send({ msg: "Invalid credentials, pleases login again" });
    }
  });
});

module.exports = { userController };

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: "string", required: true },
  last_name: { type: "string", required: true },
  age: { type: "number", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };

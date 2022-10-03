const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(process.env.SERVER_URL);
module.exports = { connection };

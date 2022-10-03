const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  task: { type: String, required: true },
  note: { type: String, required: true },
  status: { type: Boolean, required: true, default: false },
  userId: { type: String, required: true },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };

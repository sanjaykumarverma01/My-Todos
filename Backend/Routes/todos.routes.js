const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TodoModel } = require("../Models/todos.model");

const todosController = express.Router();

todosController.get("/", async (req, res) => {
  const todos = await TodoModel.find({ userId: req.body.userId });
  if (todos) {
    res.status(200).send(todos);
  } else {
    res.status(404).send({ msg: "Data not found" });
  }
});

todosController.get("/:id", async (req, res) => {
  const { id } = req.params;
  const todos = await TodoModel.findById({ _id: id });
  if (todos) {
    res.status(200).send(todos);
  } else {
    res.status(404).send({ msg: "Data not found" });
  }
});

todosController.post("/create", async (req, res) => {
  const { heading, task, note, status, userId } = req.body;
  const todo = new TodoModel({
    heading,
    task,
    note,
    status,
    userId,
  });
  try {
    await todo.save();
    res.status(200).send({ msg: "Todos created successfully" });
  } catch (err) {
    res.status(500).send({ msg: "Something went wrong" });
  }
});

todosController.patch("/edit/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const payload = req.body;
  const editTodo = await TodoModel.findOneAndUpdate(
    {
      _id: todoId,
      userId: req.body.userId,
    },
    payload
  );
  if (editTodo) {
    res.status(201).send({ msg: "Todos updated successfully" });
  } else {
    res.send({ msg: "Couldn't update" });
  }
});

todosController.delete("/delete/:todoId", async (req, res) => {
  const { todoId } = req.params;
  const deleteTodo = await TodoModel.findOneAndDelete({
    _id: todoId,
    userId: req.body.userId,
  });
  if (deleteTodo) {
    res.status(200).send({ msg: "Todos deleted successfully" });
  } else {
    res.status(404).send({ msg: "Todos Not Found" });
  }
});

module.exports = { todosController };

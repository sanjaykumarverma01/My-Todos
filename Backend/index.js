const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { authentication } = require("./Middlewares/authentication");
const { todosController } = require("./Routes/todos.routes");
const { userController } = require("./Routes/user.routes");

const app = express();
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the server successfully");
  } catch (err) {
    console.log("Failed to connect to the server");
    console.log(err);
  }
  console.log(`listening on Port :  ${PORT}`);
});
app.use(cors());
app.use("/user", userController);
app.use(authentication);
app.use("/todos", todosController)
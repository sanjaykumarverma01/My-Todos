import { Box, Button, FormLabel, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createTodo, getTodos } from "../../Redux/AppReducer/action";
import { CREATE_TODOS_SUCCESS } from "../../Redux/AppReducer/actionType";
import { loadData } from "../../Utils/accessLocalStorage";

const AddTodos = () => {
  const [heading, setHeading] = useState("");
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [deadline, setDeadline] = useState("");
  const token = loadData("token");
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const comingFrom = location?.state?.from?.pathname || "/todos";

  const handleAddTodo = () => {
    const payload = {
      heading: heading,
      task: task,
      note: note,
      deadline: deadline,
    };
    dispatch(createTodo(payload, token)).then((res) => {
      if (res.type === CREATE_TODOS_SUCCESS) {
        alert("Todo created successfully");
        navigate(comingFrom, { replace: true });
      }
      dispatch(getTodos(token));
    });
  };

  return (
    <Box>
      <Heading size="lg">Add Todos</Heading>
      <Box w="30%" m="auto" mt="20px">
        <FormLabel>Heading</FormLabel>
        <Input
          variant="filled"
          onChange={(e) => setHeading(e.target.value)}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <FormLabel>Task</FormLabel>
        <Input
          variant="filled"
          onChange={(e) => setTask(e.target.value)}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <FormLabel>Note</FormLabel>
        <Input
          variant="filled"
          onChange={(e) => setNote(e.target.value)}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <FormLabel>Deadline</FormLabel>
        <Input
          variant="filled"
          type="date"
          onChange={(e) => setDeadline(e.target.value)}
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        <Button onClick={handleAddTodo} colorScheme="cyan">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export { AddTodos };

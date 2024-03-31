import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTodos, updateTodo } from "../../Redux/AppReducer/action";
import { UPDATE_TODOS_SUCCESS } from "../../Redux/AppReducer/actionType";
import { loadData } from "../../Utils/accessLocalStorage";

const EditTodos = () => {
  const params = useParams();
  const id = params.id;
  const token = loadData("token");
  const dispatch = useDispatch();

  const [heading, setHeading] = useState("");
  const [note, setNote] = useState("");
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const comingFrom = location?.state?.from?.pathname || "/todos";

  const getTodo = () => {
    axios
      .get(
        `https://sanjay-crud-fullstack-api.herokuapp.com/todos/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setHeading(res.data.heading);
        setNote(res.data.note);
        setTask(res.data.task);
        setDeadline(res.data.deadline);
      });
  };

  const handleUpdateTodo = () => {
    const payload = {
      heading: heading,
      task: task,
      note: note,
      deadline: deadline,
    };
    dispatch(updateTodo(id, token, payload)).then((res) => {
      if (res.type === UPDATE_TODOS_SUCCESS) {
        alert("Todo updated successfully");
        navigate(comingFrom, { replace: true });
      }
      dispatch(getTodos(token));
    });
  };

  useEffect(() => {
    getTodo();
  }, [getTodo]);
  return (
    <Box>
      <Heading size="lg">Edit Todos</Heading>
      <Box w="30%" m="auto" mt="20px">
        <VStack gap={5}>
          <Input
            variant="filled"
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
          />
          <Input
            variant="filled"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Input
            variant="filled"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
          <Input
            variant="filled"
            type="date"
            onChange={(e) => setDeadline(e.target.value)}
          />

          <Button onClick={handleUpdateTodo} colorScheme="cyan">
            Update Todo
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default EditTodos;

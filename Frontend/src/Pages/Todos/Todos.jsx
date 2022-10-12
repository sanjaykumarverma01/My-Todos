import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodo,
  getTodos,
  updateTodo,
} from "../../Redux/AppReducer/action";
import { loadData, saveData } from "../../Utils/accessLocalStorage";
import { Link, useNavigate } from "react-router-dom";
const Todos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.AppReducer.todos);
  const token = loadData("token");

  useEffect(() => {
    if (token && todos.length === 0) {
      dispatch(getTodos(token));
    }
  }, [token, todos.length, dispatch]);

  const handleDelete = (id, token) => {
    dispatch(deleteTodo(id, token)).then((res) => {
      dispatch(getTodos(token));
    });
  };

  const handleStatus = (id, status) => {
    const payload = {
      status: !status,
    };
    dispatch(updateTodo(id, token, payload)).then((res) => {
      dispatch(getTodos(token));
    });
  };

  const handleSignout = () => {
    saveData("isAuth", false);
    saveData("token", "");
    navigate("/");
  };

  return (
    <Box>
      <Flex
        justifyContent="space-evenly"
        borderBottom="2px solid gray"
        p="1%"
        bgColor="white"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <Button colorScheme="orange">
          <Link to="/todos/create">Add Todo</Link>
        </Button>
        <Button colorScheme="orange">
          <Link to="/">Back to home</Link>
        </Button>
        <Button colorScheme="orange" onClick={handleSignout}>
          Sign out
        </Button>
      </Flex>
      <Box>
        <Box>
          <Heading size="xl" textAlign="center">
            Todos
          </Heading>
        </Box>
        <Box>
          <Table>
            <Thead className="th">
              <Tr>
                <Th
                  color="white"
                  textAlign="center"
                  borderRight="1px solid black"
                >
                  Heading
                </Th>
                <Th
                  color="white"
                  textAlign="center"
                  br="1px solid white"
                  borderRight="1px solid black"
                >
                  Task
                </Th>
                <Th
                  color="white"
                  textAlign="center"
                  br="1px solid white"
                  borderRight="1px solid black"
                >
                  Note
                </Th>
                <Th
                  color="white"
                  textAlign="center"
                  br="1px solid white"
                  borderRight="1px solid black"
                >
                  Deadline
                </Th>
                <Th
                  color="white"
                  textAlign="center"
                  br="1px solid white"
                  borderRight="1px solid black"
                >
                  Task Status
                </Th>
                <Th
                  color="white"
                  textAlign="center"
                  br="1px solid white"
                  borderRight="1px solid black"
                >
                  Delete Todos
                </Th>
                <Th
                  color="white"
                  textAlign="center"
                  br="1px solid white"
                  borderRight="1px solid black"
                >
                  Edit Todos
                </Th>
              </Tr>
            </Thead>
            {todos?.length > 0 &&
              todos.map((todo) => {
                return (
                  <Tbody key={todo._id}>
                    <Tr>
                      <Td textAlign="center" border="1px solid black">
                        {todo.heading}
                      </Td>
                      <Td textAlign="center" border="1px solid black">
                        {todo.task}
                      </Td>
                      <Td textAlign="center" border="1px solid black">
                        {todo.note}
                      </Td>
                      <Td textAlign="center" border="1px solid black">
                        {todo.deadline}
                      </Td>
                      <Td textAlign="center" border="1px solid black">
                        <Button
                          variant="link"
                          colorScheme={todo.status ? "green" : "red"}
                          onClick={() => {
                            handleStatus(todo._id, todo.status);
                          }}
                        >
                          {todo.status ? "Done" : "Not Done"}
                        </Button>
                      </Td>
                      <Td textAlign="center" border="1px solid black">
                        <Button
                          variant="link"
                          colorScheme="orange"
                          onClick={() => {
                            handleDelete(todo._id, token);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                      <Td textAlign="center" border="1px solid black">
                        <Button variant="link" colorScheme="blue">
                          <Link to={`/todos/edit/${todo._id}`}>Edit</Link>
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                );
              })}
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export { Todos };

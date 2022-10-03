import React from "react";
import { Route, Routes } from "react-router-dom";
import { ReqAuth } from "../Components/ReqAuth";
import { Todos } from "../Pages/Todos/Todos";
import { Login } from "../Pages/User/Login";
import { Signup } from "../Pages/User/Signup";
import Home from "../Pages/Home";
import { Box } from "@chakra-ui/react";
import EditTodos from "../Pages/Todos/EditTodos";
import { AddTodos } from "../Pages/Todos/AddTodos";

const AllRoutes = () => {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/todos"
          element={
            <ReqAuth>
              <Todos />
            </ReqAuth>
          }
        />
        <Route
          path="/todos/create"
          element={
            <ReqAuth>
              <AddTodos />
            </ReqAuth>
          }
        />
        <Route
          path="/todos/edit/:id"
          element={
            <ReqAuth>
              <EditTodos />
            </ReqAuth>
          }
        />
      </Routes>
    </Box>
  );
};

export default AllRoutes;

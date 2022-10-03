import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../../Redux/AuthReducer/action";
import { USER_LOGIN_SUCCESS } from "../../Redux/AuthReducer/actionType";
import { saveData } from "../../Utils/accessLocalStorage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const comingFrom = location?.state?.from?.pathname || "/todos";

  const handleSubmit = () => {
    const payload = {
      email: email,
      password: password,
    };
    dispatch(login(payload)).then((res) => {
      if (res.type === USER_LOGIN_SUCCESS) {
        saveData("token", res.token);
        saveData("isAuth", true);
        if (res.token) {
          alert("Login successful");
          navigate(comingFrom, { replace: true });
        }
      }
    });
  };
  return (
    <Box>
      <Flex textAlign="left" p="1%" justifyContent="space-evenly">
        <Button colorScheme="cyan">
          <Link to="/">Back to Home</Link>
        </Button>
        <Button colorScheme="cyan">
          <Link to="/signup">Sign up</Link>
        </Button>
      </Flex>
      <Heading color="tomato">Login Here</Heading>
      <Box w="30%" m="auto" mt="20px">
        <FormControl>
          <Box mt="20px">
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mt="20px">
            <Input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mt="20px">
            <Button value="Login" colorScheme="cyan" onClick={handleSubmit}>
              Login
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export { Login };

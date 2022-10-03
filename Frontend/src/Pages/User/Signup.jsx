import React from "react";
import { useState } from "react";
import { signup } from "../../Redux/AuthReducer/action";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { USER_SIGNUP_SUCCESS } from "../../Redux/AuthReducer/actionType";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
} from "@chakra-ui/react";

const Signup = () => {
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const comingFrom = location?.state?.from?.pathname || "/login";

  const handleSignup = () => {
    const payload = {
      first_name,
      last_name,
      age,
      email,
      password,
    };

    dispatch(signup(payload)).then((res) => {
      if (res.type === USER_SIGNUP_SUCCESS) {
        alert("Registration Successfull");
        navigate(comingFrom, { replace: true });
      }
    });
  };
  return (
    <Box>
      <Flex justifyContent="space-evenly" p="1%">
        <Button colorScheme="cyan">
          <Link to="/">Back to home</Link>
        </Button>
        <Button colorScheme="cyan">
          <Link to="/login">Login</Link>
        </Button>
      </Flex>
      <Heading color="tomato">Signup Here</Heading>
      <Box w="30%" m="auto" mt="30px">
        <FormControl>
          <Box>
            <Input
              type="text"
              placeholder="First Name"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Box>
          <Box mt="20px">
            <Input
              type="text"
              placeholder="Last Name"
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </Box>
          <Box mt="20px">
            <Input
              type="text"
              placeholder="Age"
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </Box>
          <Box mt="20px">
            <Input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mt="20px">
            <Input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mt="20px">
            <Button colorScheme="cyan" onClick={handleSignup}>
              Sign up
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
};

export { Signup };

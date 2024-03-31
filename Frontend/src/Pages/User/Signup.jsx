import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { signup } from "../../Redux/AuthReducer/action";
import { USER_SIGNUP_SUCCESS } from "../../Redux/AuthReducer/actionType";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FiArrowLeft, FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const Toast = useToast();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const comingFrom = location?.state?.from?.pathname || "/login";

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      age,
      email,
      password,
    };

    dispatch(signup(payload)).then((res) => {
      if (res.type === USER_SIGNUP_SUCCESS) {
        Toast({
          title: "Registration Successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        navigate(comingFrom, { replace: true });
      }
    });
  };

  return (
    <Grid templateColumns="1fr 1fr" gap={8} p={8}>
      {/* Left Side - Computer Illustration */}
      <Box marginTop={"10%"}>
        <Flex justifyContent="center" alignItems="center" h="100%">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xmlSpace="preserve"
            width="70%"
            height="100%"
          >
            {/* Provided SVG code */}
            <path
              style={{ fill: "#53626F" }}
              d="M297.875,404.473c0-27.115,0-38.318,0-38.318h-68.597c0,0,0,11.203,0,38.318 c0,38.439-52.984,53.837-52.984,53.837h174.564C350.859,458.31,297.875,442.912,297.875,404.473z"
            />
            <path
              style={{ fill: "#6E8193" }}
              d="M512,379.648c0,5.054-4.098,9.152-9.152,9.152H9.152C4.098,388.8,0,384.702,0,379.648V42.188 c0-5.054,4.098-9.152,9.152-9.152h493.693c5.054,0,9.152,4.098,9.152,9.152v337.46H512z"
            />
            <rect
              x="30.306"
              y="62.065"
              style={{ fill: "#FBF5E2" }}
              width="451.382"
              height="272.541"
            />
            {/* You can add more paths or elements for further details */}
          </svg>
        </Flex>
      </Box>

      {/* Right Side - Signup Form */}
      <Box width="70%" marginTop={"10%"}>
        <Stack spacing={10}>
          <Flex justifyContent="space-between" alignItems="center">
            <Button
              variant="ghost"
              colorScheme="cyan"
              leftIcon={<FiArrowLeft />}
            >
              <Link to="/">Back to Home</Link>
            </Button>
            <Button colorScheme="cyan" leftIcon={<FiUserPlus />}>
              <Link to="/login">Login</Link>
            </Button>
          </Flex>
          <Box>
            <FormControl display={"flex"} flexDirection={"column"} gap={"20px"}>
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
               <InputRightElement>
                  <Button
                    variant="unstyled"
                    size={"auto"}
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button colorScheme="cyan" width="100%" onClick={handleSignup}>
                Sign up
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};

export { Signup };

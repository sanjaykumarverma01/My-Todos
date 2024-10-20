// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   Heading,
//   Input,
// } from "@chakra-ui/react";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { login } from "../../Redux/AuthReducer/action";
// import { USER_LOGIN_SUCCESS } from "../../Redux/AuthReducer/actionType";
// import { saveData } from "../../Utils/accessLocalStorage";

// const Login = () => {
// const navigate = useNavigate();
// const dispatch = useDispatch();
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("");
// const location = useLocation();
// const comingFrom = location?.state?.from?.pathname || "/todos";

// const handleSubmit = () => {
//   const payload = {
//     email: email,
//     password: password,
//   };
//   dispatch(login(payload)).then((res) => {
//     if (res.type === USER_LOGIN_SUCCESS) {
//       saveData("token", res.token);
//       saveData("isAuth", true);
//       if (res.token) {
//         alert("Login successful");
//         navigate(comingFrom, { replace: true });
//       }
//     }
//   });
// };
//   return (
//     <Box>
//       <Flex textAlign="left" p="1%" justifyContent="space-evenly">
//         <Button colorScheme="cyan">
//           <Link to="/">Back to Home</Link>
//         </Button>
//         <Button colorScheme="cyan">
//           <Link to="/signup">Sign up</Link>
//         </Button>
//       </Flex>
//       <Heading color="tomato">Login Here</Heading>
//       <Box w="30%" m="auto" mt="20px">
//         <FormControl>
//           <Box mt="20px">
//             <Input
//               type="email"
//               placeholder="Email"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Box>
//           <Box mt="20px">
//             <Input
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Box>
//           <Box mt="20px">
//             <Button value="Login" colorScheme="cyan" onClick={handleSubmit}>
//               Login
//             </Button>
//           </Box>
//         </FormControl>
//       </Box>
//     </Box>
//   );
// };

// export { Login };

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
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { USER_LOGIN_SUCCESS } from "../../Redux/AuthReducer/actionType";
import { login } from "../../Redux/AuthReducer/action";
import { saveData } from "../../Utils/accessLocalStorage";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const comingFrom = location?.state?.from?.pathname || "/todos";

  const Toast = useToast();

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
          Toast({
            title: "Login Successful",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate(comingFrom, { replace: true });
        }
      }
    });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

      {/* Right Side - Login Form */}
      <Box width={"70%"} marginTop={"20%"}>
        <Stack spacing={10}>
          <Flex justifyContent="space-between" alignItems="center">
            <Link to="/">
              <Button
                variant="ghost"
                colorScheme="cyan"
                leftIcon={<FiArrowLeft />}
              >
                Back to Home
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="cyan" leftIcon={<FiUserPlus />}>
                Sign up
              </Button>
            </Link>
          </Flex>
          <Box>
            <FormControl display={"flex"} flexDirection={"column"} gap={"20px"}>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
              <Button colorScheme="cyan" width="100%" onClick={handleSubmit}>
                Login
              </Button>
            </FormControl>
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};

export { Login };

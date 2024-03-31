// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { Box, Heading, Button } from "@chakra-ui/react";
// import { ArrowDownIcon } from "@chakra-ui/icons";
// const Home = () => {
//   return (
//     <Box>
//       <Box className="nav">
//         <Button colorScheme="cyan">
//           <NavLink to="/signup">Sign up</NavLink>
//         </Button>
//         <Heading size="lg" color="lightcoral">
//         Home Page
//         </Heading>
//         <Button colorScheme="cyan">
//           <NavLink to="/login">Login</NavLink>
//         </Button>
//       </Box>
//       <Box>
//         <Heading color="tomato" size="3xl" mt="100px">
//           Welcome to Todos
//         </Heading>
//         <Heading size="lg" mt="50px">
//           If you are already login then click{" "}
//           <span style={{ color: "tomato" }}>
//             Below Button <ArrowDownIcon />
//           </span>{" "}
//           to see <br />{" "}
//           <Heading color="teal" mt="20px">
//             YOUR TODOS
//           </Heading>
//         </Heading>
//       </Box>
//       <Box mt="20px">
//         <Button colorScheme="cyan">
//           <Link to="/todos">Todos</Link>
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Home;


import React from 'react';
import { Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiEye, FiUserPlus, FiLogIn } from 'react-icons/fi';

const Home = () => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      h="100vh"
      bg="gray.100"
    >
      <Heading mb={8}>Welcome to My App</Heading>
      <Button
        as={RouterLink}
        to="/todos"
        colorScheme="teal"
        size="lg"
        mb={4}
        leftIcon={<FiEye />}
      >
        See Todos
      </Button>
      <Flex>
        <Link as={RouterLink} to="/signup" mr={4}>
          <Button colorScheme="blue" size="lg" leftIcon={<FiUserPlus />}>
            Sign Up
          </Button>
        </Link>
        <Link as={RouterLink} to="/login">
          <Button colorScheme="green" size="lg" leftIcon={<FiLogIn />}>
            Login
          </Button>
        </Link>
      </Flex>
      <Text mt={8} fontSize="sm" color="gray.500">
        Created by{' '}
        <Link
          href="https://www.linkedin.com/in/sanjaykumar-verma-a73349219/"
          isExternal
          color="teal.500"
          textDecoration="underline"
        >
          Sanjaykumar Verma
        </Link>{' '}
      </Text>
    </Flex>
  );
};

export default Home;

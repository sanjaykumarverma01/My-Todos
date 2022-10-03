import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Box, Heading, Button } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
const Home = () => {
  return (
    <Box>
      <Box className="nav">
        <Button colorScheme="cyan">
          <NavLink to="/signup">Sign up</NavLink>
        </Button>
        <Heading size="lg" color="lightcoral">
        Home Page
        </Heading>
        <Button colorScheme="cyan">
          <NavLink to="/login">Login</NavLink>
        </Button>
      </Box>
      <Box>
        <Heading color="tomato" size="3xl" mt="100px">
          Welcome to Todos
        </Heading>
        <Heading size="lg" mt="50px">
          If you are already login then click{" "}
          <span style={{ color: "tomato" }}>
            Below Button <ArrowDownIcon />
          </span>{" "}
          to see <br />{" "}
          <Heading color="teal" mt="20px">
            YOUR TODOS
          </Heading>
        </Heading>
      </Box>
      <Box mt="20px">
        <Button colorScheme="cyan">
          <Link to="/todos">Todos</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default Home;

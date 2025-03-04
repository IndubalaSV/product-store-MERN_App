import React from "react";
import { Container, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NoProducts = () => {
  return (
    <Container maxW="container.sm" mt={4} fontSize={"sm"}>
      <Text textAlign={"center"}>No Products😢 </Text>
      <Link to="/create">
        <Text
          textAlign={"center"}
          color={"blue.500"}
          _hover={{ textDecoration: "dotted underline" }}
        >
          Create new product 🚀
        </Text>
      </Link>
    </Container>
  );
};

export default NoProducts;

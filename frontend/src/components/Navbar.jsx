import React from "react";
import {
  Container,
  HStack,
  IconButton,
  Flex,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import ThemeToggleButton from "./ThemeToggleButton";
// import { useProductStore } from "../store/product.js";

const Navbar = () => {
  return (
    <div>
      <Container px={4}>
        <Flex justifyContent="space-between" alignItems="center" py={4}>
          <Text
            bgGradient="linear(to-r, teal.400, blue.500, purple.600)"
            bgClip="text"
            fontSize="xl"
            fontWeight="bold"
          >
            <Link to="/">Product Store🛒</Link>
          </Text>
          <HStack spacing={4}>
            <Link to="/create">
              <IconButton
                aria-label="Add"
                icon={<AddIcon />}
                _hover={{ bg: useColorModeValue("blue.100", "blue.300") }}
                transition="background 0.2s ease-in-out"
              />
            </Link>
            <ThemeToggleButton />
          </HStack>
        </Flex>
      </Container>
    </div>
  );
};

export default Navbar;

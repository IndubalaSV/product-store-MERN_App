import React, { useState } from "react";
import {
  Container,
  Stack,
  Input,
  Text,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  let navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();

  const { createProduct, getProducts } = useProductStore();
  let handleAddProduct = async () => {
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct);
    console.log(success, message);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    // Refresh the product list
    await getProducts();

    setNewProduct({ name: "", price: "", image: "" });
    navigate("/"); // move to home page
  };

  return (
    <Container
      p={4}
      maxW="container.sm"
      bg={useColorModeValue("gray.200", "gray.600")}
      rounded="lg"
    >
      <Text p={4} textAlign={"center"} fontSize="m" fontWeight="bold">
        Create new product
      </Text>
      <Stack gap="4">
        <Input
          placeholder="name"
          variant="subtle"
          size={"sm"}
          bg={useColorModeValue("white", "gray.700")}
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <Input
          placeholder="price"
          variant="subtle"
          bg={useColorModeValue("white", "gray.700")}
          size={"sm"}
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value,
            })
          }
        />
        <Input
          placeholder="image"
          variant="subtle"
          size={"sm"}
          bg={useColorModeValue("white", "gray.700")}
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              image: e.target.value,
            })
          }
        />
        <Button
          size={"md"}
          bg={useColorModeValue("blue.200", "blue.500")}
          onClick={handleAddProduct}
        >
          Add product
        </Button>
      </Stack>
    </Container>
  );
};

export default CreatePage;

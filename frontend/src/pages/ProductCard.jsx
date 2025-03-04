import {
  Card,
  Image,
  Text,
  Container,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Stack,
  Box,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

const ProductCard = ({ product }) => {
  let { image, name, price } = product;
  let toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let { deleteProduct, updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDelete = async (id) => {
    let { success, message } = await deleteProduct(id);
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
  };

  let handleUpdate = async (id) => {
    let { success, message } = await updateProduct(id, updatedProduct);
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
  };

  return (
    <Box
      minW="200px"
      overflow="hidden"
      p={0}
      borderRadius={"md"}
      bg={useColorModeValue("gray.100", "gray.900")}
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-5px)",
        transition: "all 0.3s ease",
      }}
    >
      <Image
        src={image}
        alt={name}
        maxW={"100%"}
        aspectRatio="16/9"
        objectFit={"cover"}
        borderRadius={"md"}
      />
      <Container pl={2} mt={1} borderRadius={"md"} fontFamily={"consolas"}>
        <Text fontWeight="bold">{name}</Text>
        <Text>${price}</Text>
      </Container>
      <Container display={"flex"} justifyContent={"flex-start"} p={2} gap={2}>
        <IconButton
          size={"sm"}
          aria-label="edit"
          bg={useColorModeValue("blue.100", "blue.900")}
          onClick={onOpen}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="sm"
          aria-label="delete"
          bg={useColorModeValue("red.100", "red.900")}
          onClick={() => handleDelete(product._id)}
        >
          <DeleteIcon />
        </IconButton>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap="4">
              <Input
                placeholder="name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="price"
                name="price"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="image"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.image,
                  })
                }
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                handleUpdate(product._id);
                onClose();
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

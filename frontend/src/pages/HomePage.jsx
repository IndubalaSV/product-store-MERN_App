import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Text, Container } from "@chakra-ui/react";
import NoProducts from "./NoProducts";
import { useProductStore } from "../store/product";

const HomePage = () => {
  let { getProducts, products } = useProductStore();
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  console.log(products);
  return (
    <>
      <Text
        textAlign={"center"}
        fontSize="md"
        fontWeight="bold"
        bgGradient="linear(to-r, blue.300, blue.900)"
        bgClip="text"
      >
        Current Products
      </Text>
      {!products.length && <NoProducts />}
      <Container
        maxW="container.xl"
        mt={4}
        display="grid"
        gridTemplateColumns={"repeat(auto-fill, minmax(200px, 1fr))"}
        gap={4}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Container>
    </>
  );
};

export default HomePage;

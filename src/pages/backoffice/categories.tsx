import React from "react";
import { Box, Heading } from "@chakra-ui/react";

interface CategoriesProps {}

const Categories: React.FC<CategoriesProps> = () => {
  return (
    <Box py={2} px={2}>
      <Heading>Categories</Heading>
    </Box>
  );
};

export default Categories;

import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Choice from "../components/Choice";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <SimpleGrid columns={2} row={2} overflow="hidden" position="relative">
      <Choice />
      <Choice />
      <Choice />
      <Choice />
    </SimpleGrid>
  );
};

export default Home;

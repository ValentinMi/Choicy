import React from "react";
import { Box, Heading } from "@chakra-ui/react";

interface AwaitingChoicesProps {}

const AwaitingChoices: React.FC<AwaitingChoicesProps> = () => {
  console.log("Await choices");
  return (
    <>
      <Box>
        <Heading>AwaitingChoices</Heading>
      </Box>
    </>
  );
};

export default AwaitingChoices;

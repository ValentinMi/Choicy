import React from "react";
import { Box, Heading } from "@chakra-ui/react";

interface AwaitingChoicesProps {}

const AwaitingChoices: React.FC<AwaitingChoicesProps> = () => {
  return (
    <Box py={2} px={2}>
      <Heading>AwaitingChoices</Heading>
    </Box>
  );
};

export default AwaitingChoices;

import { Box, ChakraProvider, Heading, theme } from "@chakra-ui/react";
import * as React from "react";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Heading>Hello Choicy</Heading>
    </Box>
  </ChakraProvider>
);

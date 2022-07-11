import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import Header from "./components/Header/Header";
import Router from "./Router";

export const App: React.FC = () => (
  <Box position="relative">
    <ChakraProvider theme={theme}>
      <Header />
      <Router />
    </ChakraProvider>
  </Box>
);

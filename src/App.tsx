import { ChakraProvider, theme } from "@chakra-ui/react";
import * as React from "react";
import Router from "./Router";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>
);

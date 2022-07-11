import { Box, ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import * as React from "react";
import Header from "./components/Header/Header";
import Router from "./Router";

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Box position="relative">
      <Header />
      <Router />
    </Box>
  </ChakraProvider>
);

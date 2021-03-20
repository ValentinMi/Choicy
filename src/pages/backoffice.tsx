import { Box } from "@chakra-ui/react";
import React from "react";
import RouterBackOffice from "../BackOfficeRouter";
import DrawerMenu from "../components/Drawer";

interface BackOfficeProps {}

const BackOffice: React.FC<BackOfficeProps> = () => {
  return (
    <Box margin="0" padding="0" position="relative">
      <DrawerMenu />
      <RouterBackOffice />
    </Box>
  );
};

export default BackOffice;

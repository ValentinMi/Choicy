import { Box } from "@chakra-ui/react";
import React from "react";
import RouterBackOffice from "../BackOfficeRouter";

interface BackOfficeProps {}

const BackOffice: React.FC<BackOfficeProps> = () => {
  return (
    <Box px={2} position="relative">
      <RouterBackOffice />
    </Box>
  );
};

export default BackOffice;

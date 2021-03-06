import { Box, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import RouterBackoffice from "../BackofficeRouter";
import DrawerMenu from "./backoffice/drawer";

interface BackOfficeProps {}

const BackOffice: React.FC<BackOfficeProps> = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  return (
    <Box>
      <Box width="100%" display="flex" justifyContent="space-around">
        <DrawerMenu />
        <Heading>Welcome {user!.username}</Heading>
      </Box>
      <RouterBackoffice />
    </Box>
  );
};

export default BackOffice;

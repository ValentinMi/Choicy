import { Box, Heading } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";

interface BackOfficeProps {}

const BackOffice: React.FC<BackOfficeProps> = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  return (
    <Box>
      <Heading>Welcome {user!.username}</Heading>
    </Box>
  );
};

export default BackOffice;

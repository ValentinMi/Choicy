import React from "react";
import { Box, Heading } from "@chakra-ui/react";

export interface UsersProps {}

const Users: React.FC<UsersProps> = () => {
  return (
    <Box py={2} px={2}>
      <Heading>Users</Heading>
    </Box>
  );
};

export default Users;

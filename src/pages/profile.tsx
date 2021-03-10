import React, { useContext } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { AuthContext } from "../context/auth.context";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  return (
    <Box>
      <Heading>Welcome to your profile {user?.username}</Heading>
    </Box>
  );
};

export default Profile;

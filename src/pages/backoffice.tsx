import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ICredentials } from "../types";

interface BackOfficeProps {}

const BackOffice: React.FC<BackOfficeProps> = () => {
  const {
    state: { user },
    login,
  } = useContext(AuthContext);
  return (
    <Box>
      {user ? (
        <Heading>Welcome {user.username}</Heading>
      ) : (
        <LoginForm login={login} />
      )}
    </Box>
  );
};

export default BackOffice;

const LoginForm: React.FC<{ login: (crendentials: ICredentials) => void }> = ({
  login,
}) => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(loginForm);
  };

  return (
    <Center h="100vh">
      <Box boxShadow="dark-lg" p={5}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={handleChange}
              name="username"
              value={loginForm.username}
            />
          </FormControl>
          <Box mt={4}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={handleChange}
                name="password"
                type="password"
                value={loginForm.password}
              />
            </FormControl>
          </Box>
          <Center>
            <Button mt={4} type="submit" colorScheme="blue">
              Login
            </Button>
          </Center>
        </form>
      </Box>
    </Center>
  );
};

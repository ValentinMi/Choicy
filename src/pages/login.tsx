import {
  Center,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { login } = useContext(AuthContext);

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
        <Center>
          Pas encore de compte ?
          <Link as={RouterLink} to="/register" color="blue.500" ml={1}>
            Cliquez ici !
          </Link>
        </Center>
      </Box>
    </Center>
  );
};

export default Login;

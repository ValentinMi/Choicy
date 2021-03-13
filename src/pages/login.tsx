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
import ErrorMessage from "../components/ErrorMessage";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const { login, errorLogin } = useContext(AuthContext);

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
        {errorLogin && <ErrorMessage children="Wrong username or password" />}
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={handleChange}
              name="username"
              value={loginForm.username}
            />
          </FormControl>
          <Box mt={4}>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={handleChange}
                name="password"
                type="password"
                value={loginForm.password}
                autoComplete="on"
              />
            </FormControl>
          </Box>
          <Center>
            <Button mt={4} type="submit" colorScheme="blue">
              Login
            </Button>
          </Center>
        </form>
        <Center mt={2}>
          Don't have an account yet?
          <Link as={RouterLink} to="/register" color="blue.500" ml={1}>
            Sign Up
          </Link>
        </Center>
      </Box>
    </Center>
  );
};

export default Login;

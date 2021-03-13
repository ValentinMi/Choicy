import {
  Center,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { register } from "../api/users.api";
import { AUTH_STORAGE_KEY } from "../constants/auth.constants";
import useSessionStorage from "../hooks/useSessionStorage";
import ErrorMessage from "../components/ErrorMessage";

export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string | boolean>(false);
  const { setStoredData } = useSessionStorage(AUTH_STORAGE_KEY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerForm.password === registerForm.confirm_password) {
      const response = await register({
        username: registerForm.username,
        password: registerForm.password,
      });
      if (response.response.status >= 400 && response.response.status <= 410) {
        setError(response.response.data);
      } else {
        setStoredData(response?.headers["choicy-auth-token"]);
      }
    } else {
      setError("Passwords don't match");
    }
  };

  return (
    <Center h="100vh">
      <Box boxShadow="dark-lg" p={5}>
        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage children={error} />}
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              onChange={handleChange}
              name="username"
              value={registerForm.username}
            />
          </FormControl>
          <Box mt={4}>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={handleChange}
                name="password"
                type="password"
                value={registerForm.password}
                autoComplete="on"
              />
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                onChange={handleChange}
                name="confirm_password"
                type="password"
                value={registerForm.confirm_password}
                autoComplete="on"
              />
            </FormControl>
          </Box>
          <Center>
            <Button mt={4} type="submit" colorScheme="blue">
              Register
            </Button>
          </Center>
        </form>
        <Center mt={2}>
          Already have an account ?
          <Link as={RouterLink} to="/login" color="blue.500" ml={1}>
            Sign In
          </Link>
        </Center>
      </Box>
    </Center>
  );
};

export default Register;

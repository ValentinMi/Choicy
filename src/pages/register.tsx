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

export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    password2: "",
  });
  const { setStoredData } = useSessionStorage(AUTH_STORAGE_KEY);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerForm.password.length < 8) {
      alert("nul");
    } else {
      if (registerForm.password === registerForm.password2) {
        const response = await register({
          username: registerForm.username,
          password: registerForm.password,
        });
        console.log(response);
        setStoredData(response?.headers["choicy-auth-token"]);
      } else {
        alert("pas les mêmes");
      }
    }
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
              value={registerForm.username}
            />
          </FormControl>
          <Box mt={4}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={handleChange}
                name="password"
                type="password"
                value={registerForm.password}
              />
            </FormControl>
          </Box>
          <Box mt={4}>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                onChange={handleChange}
                name="password2"
                type="password"
                value={registerForm.password2}
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

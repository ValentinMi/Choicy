import React, { useContext } from "react";
import {
  Flex,
  Link,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import ProfileMenu from "../BackOffice/ProfileMenu";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import DrawerMenu from "../Drawer";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { colorMode, toggleColorMode } = useColorMode();

  const location = useLocation();

  return (
    <Flex p={[1, 2]} direction={["column", "row"]} zIndex={5} boxShadow="0px 0px 15px 0px rgba(0,0,0,0.7)">
      {location.pathname.includes("/backoffice") ? <DrawerMenu /> : null}

      <Flex width="100%" justifyContent="center" alignSelf="center">
        <Link
          as={RouterLink}
          to="/"
          m={[1, 2]}
          _hover={{ textDecoration: "none" }}
        >
          Choicy
        </Link>
      </Flex>

      <Flex justifySelf="flex-end">
        <Button
          to="/login"
          opacity="0.5"
          m={[1, 2]}
          backgroundColor={useColorModeValue("whiteAlpha.700", "gray.700")}
          _hover={{ textDecoration: "none", opacity: 1, bg: useColorModeValue("gray.300", "gray.700") }}
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        {user ? (
          <ProfileMenu />
        ) : (
          <>
            <Link
              as={RouterLink}
              to="/login"
              opacity="0.5"
              m={[1, 2]}
              _hover={{ textDecoration: "none", opacity: 1 }}
            >
              <Button size="md">Sign in</Button>
            </Link>
            <Link
              as={RouterLink}
              to="/register"
              opacity="0.5"
              m={[1, 2]}
              _hover={{ textDecoration: "none", opacity: 1 }}
            >
              <Button size="md">Sign Up</Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;

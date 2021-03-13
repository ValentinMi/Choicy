import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Box,
  Link,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export interface ProfileMenuProps {}

const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  const {
    state: { user },
    logout,
  } = useContext(AuthContext);
  return (
    <Box>
      <Menu>
        <MenuButton
          backgroundColor="white"
          opacity="0.5"
          m={2}
          borderRadius={5}
          w={10}
          h={10}
          _hover={{ opacity: 1 }}
        >
          <ChevronDownIcon w="1.5em" h="1.5em" />
        </MenuButton>
        <MenuList p={1}>
          <Link
            as={RouterLink}
            to="/profile"
            _hover={{ textDecoration: "none" }}
          >
            <MenuItem>Your profile</MenuItem>
          </Link>
          {user?.isAdmin ? <MenuDivider /> : null}
          {user?.isAdmin ? (
            <Link
              as={RouterLink}
              to="/backoffice"
              _hover={{ textDecoration: "none" }}
            >
              <MenuItem>Admin Panel</MenuItem>
            </Link>
          ) : null}
          <MenuDivider />
          <Link
            as={RouterLink}
            to="/"
            onClick={logout}
            _hover={{ textDecoration: "none" }}
          >
            <MenuItem>Disconnect</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;

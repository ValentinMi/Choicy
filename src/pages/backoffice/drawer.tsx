import { HamburgerIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface DrawerProps {}

const menuList = [
  {
    path: "/backoffice/awaitingchoices",
    label: "Awaiting Choices",
  },
  {
    path: "/backoffice/choiceslist",
    label: "Choices List",
  },
  {
    path: "/backoffice/categories",
    label: "Categories",
  },
  {
    path: "/backoffice/users",
    label: "Users",
  },
];

const DrawerMenu: React.FC<DrawerProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <IconButton
        onClick={onOpen}
        aria-label="menu"
        icon={<HamburgerIcon />}
      ></IconButton>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Choicy manager</DrawerHeader>
            <DrawerBody display="flex" flexDirection="column">
              {menuList.map((link) => {
                return (
                  <Box key={link.label}>
                    <Box my={5} ml={8}>
                      <MinusIcon />
                      <Link
                        as={RouterLink}
                        to={link.path}
                        ml={3}
                        _focus={{
                          boxShadow: "none",
                        }}
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    </Box>
                    <Divider />
                  </Box>
                );
              })}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default DrawerMenu;

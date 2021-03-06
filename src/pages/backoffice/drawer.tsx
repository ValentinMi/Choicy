import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Link,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { MinusIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

interface DrawerProps {}

const DrawerMenu: React.FC<DrawerProps> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
              <Box borderBottom="1px" borderColor="#E2E8F0">
                <Box my="20px" ml="15%">
                  <MinusIcon />
                  <Link
                    as={RouterLink}
                    to="/backoffice/awaitingchoices"
                    ml="3%"
                    _focus={{
                      boxShadow: "none",
                    }}
                  >
                    Awaiting Choices
                  </Link>
                </Box>
              </Box>
              <Box borderBottom="1px" borderColor="#E2E8F0">
                <Box my="20px" ml="15%">
                  <MinusIcon />
                  <Link as={RouterLink} to="/backoffice/choiceslist" ml="3%">
                    Choices List
                  </Link>
                </Box>
              </Box>
              <Box borderBottom="1px" borderColor="#E2E8F0">
                <Box my="20px" ml="15%">
                  <MinusIcon />
                  <Link as={RouterLink} to="/backoffice/categories" ml={3}>
                    Categories
                  </Link>
                </Box>
              </Box>
              <Box borderBottom="1px" borderColor="#E2E8F0">
                <Box my="20px" ml="15%">
                  <MinusIcon />
                  <Link as={RouterLink} to="/backoffice/users" ml="3%">
                    Users
                  </Link>
                </Box>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default DrawerMenu;

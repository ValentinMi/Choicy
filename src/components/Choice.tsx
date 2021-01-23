import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";

interface ChoiceProps {}

const Choice: React.FC<ChoiceProps> = () => {
  return (
    <Box
      className="parent"
      h="50vh"
      w="100%"
      overflow="hidden"
      position="relative"
    >
      <Center
        h="100%"
        w="100%"
        className="choice"
        bgImage="url('https://picsum.photos/1920/1080')"
        backgroundPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        transition="all 1.5s"
        _hover={{ transform: "scale(1.2)" }}
      >
        <Heading
          as="h2"
          size="lg"
          color="white"
          fontWeight="bold"
          bgColor="rgba(255, 255, 255, 0.2)"
          borderRadius="10px"
          p="5px"
        >
          Lorem
        </Heading>
      </Center>
    </Box>
  );
};

export default Choice;

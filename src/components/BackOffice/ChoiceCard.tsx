import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Collapse } from "@chakra-ui/transition";
import React from "react";
import { IChoice } from "../../types";
import ChoiceDeleteButton from "./ChoiceDeleteButton";

interface ChoiceCardProps {
  choice: IChoice;
  fetchChoices: Function;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ choice, fetchChoices }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      borderRadius="10px"
      w="30vw"
      boxShadow="dark-lg"
      bg="white"
      userSelect="none"
    >
      <Center
        onClick={onToggle}
        h="50px"
        cursor="pointer"
        justifyContent="space-around"
      >
        <Text fontWeight="bold">{choice.title}</Text>
        <Text>{choice.vote} votes</Text>
        <Tag colorScheme="green">{choice.category.title}</Tag>
      </Center>
      <Collapse in={isOpen} animateOpacity>
        <Box my={3} pl={3}>
          <SimpleGrid columns={2} spacing={2}>
            {choice.proposals.map((prop) => {
              return (
                <Flex key={prop.title} align="baseline" justify="space-evenly">
                  <Heading fontSize="md" w="40%">
                    {prop.title}:
                  </Heading>
                  <Text>{prop.chosen}</Text>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Box>
        <Box display="flex" flexWrap="wrap" m={2} h="300px">
          {choice.proposals.map((prop, i) => {
            return (
              <Box key={i} boxSize="50%" p={1} fit="cover">
                <Image
                  src={`data:${
                    prop.image.contentType
                  };base64,${prop.image.data.toString("base64")}`}
                  alt={prop.title}
                  boxSize="100%"
                  fit="cover"
                />
              </Box>
            );
          })}
        </Box>
        <Box display="flex" justifyContent="flex-end" pr={3} pb={3}>
          <ChoiceDeleteButton id={choice._id} refresh={fetchChoices} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default ChoiceCard;

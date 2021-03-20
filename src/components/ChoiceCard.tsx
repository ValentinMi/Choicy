import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import React from "react";
import { IChoice } from "../types";
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
      boxShadow="lg"
      bg="white"
      userSelect="none"
    >
      <Center
        onClick={onToggle}
        h="50px"
        background="#C1C1C1"
        cursor="pointer"
        justifyContent="space-around"
        borderRadius="10px"
      >
        <Text>
          {choice.title}: {choice.vote}
        </Text>
        <Text>{choice.category.title}</Text>
      </Center>
      <Collapse in={isOpen} animateOpacity>
        <Box m={1}>
          <Stack>
            {choice.proposals.map((prop) => {
              return (
                <Flex key={prop.title} align="baseline">
                  <Heading fontSize="md" w="40%">
                    {prop.title}:
                  </Heading>
                  <Text>{prop.chosen}</Text>
                </Flex>
              );
            })}
          </Stack>
        </Box>
        <Box display="flex" flexWrap="wrap" m={2}>
          {choice.proposals.map((prop, i) => {
            return (
              <Box key={i} w="50%" p={1}>
                <Image src={prop.imageUrl} alt={prop.title} />
              </Box>
            );
          })}
        </Box>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={1}>
          <ChoiceDeleteButton id={choice._id} refresh={fetchChoices} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default ChoiceCard;

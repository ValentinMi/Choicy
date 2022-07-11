import { useDisclosure } from "@chakra-ui/hooks";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Collapse } from "@chakra-ui/transition";
import React, { useEffect, useState } from "react";
import { IChoice } from "../../types";
import ChoiceDeleteButton from "./ChoiceDeleteButton";
import colors from "../../assets/mock.colorsTag.json";
import { Button, useColorModeValue } from "@chakra-ui/react";

interface ChoiceCardProps {
  choice: IChoice;
  fetchChoices: Function;
}

const ChoiceCard: React.FC<ChoiceCardProps> = ({ choice, fetchChoices }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [tagColor, setTagColor] = useState<string>("");

  useEffect(() => {
    const currentColor = colors.filter(
      (color) => color.name === choice.category.title
    );
    setTagColor(currentColor[0].color);
  }, [setTagColor, choice.category.title]);

  return (
    <Box
      borderRadius="10px"
      w="100%"
      boxShadow="dark-lg"
      bgColor={useColorModeValue("white", "gray.700")}
      height={isOpen ? "100%" : ""}
      userSelect="none"
    >
      <Button
        onClick={onToggle}
        h="50px"
        w="100%"
        cursor="pointer"
        bgColor={useColorModeValue("white", "gray.700")}
        justifyContent="space-between"
        _focus={{ bgColor: "unset" }}
        _focusVisible={{ boxShadow: "var(--chakra-shadows-outline)" }}
      >
        <Text fontWeight="bold" flexBasis="30%" textAlign="left">{choice.title}</Text>
        <Text>{choice.vote} votes</Text>
        <Tag colorScheme={tagColor}>{choice.category.title}</Tag>
      </Button>
      <Collapse
        in={isOpen}
        animateOpacity
      >
        <Box my={3} pl={3} >
          <SimpleGrid columns={2} spacing={2}>
            {choice.proposals.map((prop) => {
              return (
                <Flex key={prop.title} align="baseline" justify="space-evenly">
                  <Heading fontSize="md" w="80%">
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
        <Box display={isOpen ? "block" : "none"} pr={3} pb={3}>
          <ChoiceDeleteButton id={choice._id} refresh={fetchChoices} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default ChoiceCard;

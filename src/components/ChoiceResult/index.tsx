import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getChoiceById } from "../../api/choices.api";
import { IChoice } from "../../types";
import "./index.css";
import ResultLine from "../ResultLine";

interface ChoiceResultProps {
  choiceObjectId: string;
  isOpen: boolean;
  onNextClick: () => void;
  isLastChoice: () => boolean;
}

const ChoiceResult: React.FC<ChoiceResultProps> = ({
  choiceObjectId,
  isOpen,
  onNextClick,
  isLastChoice,
}) => {
  const [choice, setChoice] = useState<IChoice>();

  const calculChosenRateForProposals = (choice: IChoice) => ({
    ...choice,
    proposals: choice.proposals.map((propo) => ({
      ...propo,
      rate: isNaN((propo.chosen / choice.vote) * 100)
        ? 0
        : (propo.chosen / choice.vote) * 100,
    })),
  });

  useEffect(() => {
    async function fetch() {
      let data = await getChoiceById(choiceObjectId);
      data = calculChosenRateForProposals(data);
      setChoice(data);
    }
    if (isOpen) {
      fetch();
    }
  }, [choiceObjectId, isOpen]);

  return (
    <>
      {isOpen && (
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          backgroundColor="rgba(0, 0,0, 0.5)"
        />
      )}
      <Flex
        className={`choiceresult ${
          isOpen ? "choiceresult-active" : "choiceresult-unactive"
        }`}
        direction="column"
        justify="center"
        align="center"
      >
        {!isOpen ? (
          <Heading
            as="h2"
            size="lg"
            fontWeight="bold"
            borderRadius="10px"
            p="10px"
          >
            OR
          </Heading>
        ) : (
          <Flex
            direction="column"
            w="100%"
            align="space-around"
            justify="center"
          >
            {choice?.proposals.map((propo, i) => (
              <Box my={5} key={"result" + i}>
                <ResultLine label={propo.title} rate={propo.rate!} />
              </Box>
            ))}
          </Flex>
        )}
        {isOpen && isLastChoice() === false && (
          <Button onClick={onNextClick} colorScheme="blue" mt={2}>
            Next choice
          </Button>
        )}
      </Flex>
    </>
  );
};

export default ChoiceResult;

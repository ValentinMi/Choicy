import {
  Box,
  Center,
  Heading,
  SimpleGrid,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { getChoices, putProposalChoice } from "../api/choices.api";
import ChoiceResult from "../components/ChoiceResult";
import Proposal from "../components/Proposal";
import { IChoice } from "../types";
import shuffleArray from "../utils/shuffleArray";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [choices, setChoices] = useState<IChoice[]>([]);
  const [currentChoiceIndex, setCurrentChoiceIndex] = useState<number>(0);
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNextClick = () => {
    onClose();
    setCurrentChoiceIndex((idx) => idx + 1);
  };
  const handleProposalClick = async (proposalIndex: number) => {
    if (choiceHistory.includes(choices[currentChoiceIndex]._id)) return;
    await putProposalChoice(choices[currentChoiceIndex]._id, proposalIndex);
    setChoiceHistory([...choiceHistory, choices[currentChoiceIndex]._id]);
    onOpen();
  };

  const calculIsLastChoice = useCallback(
    () => currentChoiceIndex === choices.length - 1,
    [choices, currentChoiceIndex]
  );

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      let data = await getChoices();
      data = shuffleArray(data);
      setChoices(data);
      setIsLoading(false);
    }
    fetch();
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Center
          h="100%"
          w="100vw"
          bgColor="gray.600"
          display="flex"
          flexDirection="column"
        >
          <Heading color="white">Loading</Heading>
          <Spinner size="xl" color="white" mt={10} />
        </Center>
      ) : (
        choices.length > 0 && (
          <Box position='relative'> 
            <SimpleGrid
              columns={[1, 2]}
              row={[1, 2]}
              overflow="hidden"
              position="relative"
              h="calc(100vh - 72px)"
            >
              {choices[currentChoiceIndex].proposals.map((proposal, i) => (
                <Proposal
                  key={proposal.title + i}
                  proposalIndex={i}
                  info={proposal}
                  onProposalClick={handleProposalClick}
                />
              ))}
            </SimpleGrid>
            <ChoiceResult
              choiceObjectId={choices[currentChoiceIndex]._id}
              onNextClick={handleNextClick}
              isOpen={isOpen}
              isLastChoice={calculIsLastChoice}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export default Home;

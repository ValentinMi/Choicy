import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { getChoices, putProposalChoice } from "../api/choices.api";
import ChoiceResult from "../components/ChoiceResult";
import Proposal from "../components/Proposal";
import { IChoice } from "../types";
import shuffleArray from "../utils/shuffleArray";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [choices, setChoices] = useState<IChoice[]>([]);
  const [currentChoiceIndex, setCurrentChoiceIndex] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNextClick = () => {
    onClose();
    setCurrentChoiceIndex((idx) => idx + 1);
  };

  const handleProposalClick = async (proposalIndex: number) => {
    await putProposalChoice(choices[currentChoiceIndex]._id, proposalIndex);
    onOpen();
  };

  const calculIsLastChoice = useCallback(
    () => currentChoiceIndex === choices.length - 1,
    [choices, currentChoiceIndex]
  );

  useEffect(() => {
    async function fetch() {
      let data = await getChoices();
      data = shuffleArray(data);
      setChoices(data);
    }
    fetch();
  }, []);

  return (
    <Box>
      {choices.length > 0 && (
        <Box>
          <SimpleGrid columns={2} row={2} overflow="hidden" position="relative">
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
      )}
    </Box>
  );
};

export default Home;

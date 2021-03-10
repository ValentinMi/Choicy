import {
  Box,
  Button,
  SimpleGrid,
  useDisclosure,
  IconButton,
  Link,
  Flex,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getChoices, putProposalChoice } from "../api/choices.api";
import ChoiceResult from "../components/ChoiceResult";
import Proposal from "../components/Proposal";
import { AuthContext } from "../context/auth.context";
import { IChoice } from "../types";
import shuffleArray from "../utils/shuffleArray";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [choices, setChoices] = useState<IChoice[]>([]);
  const [currentChoiceIndex, setCurrentChoiceIndex] = useState<number>(0);
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    state: { user },
  } = useContext(AuthContext);

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
      let data = await getChoices();
      data = shuffleArray(data);
      setChoices(data);
    }
    fetch();
  }, []);

  return (
    <Box bg="black">
      <Box
        w="100%"
        position="absolute"
        zIndex="5"
        display="flex"
        justifyContent="flex-end"
      >
        {user ? (
          <Link
            as={RouterLink}
            to="/profile"
            opacity="0.5"
            m={2}
            _hover={{ opacity: 1 }}
          >
            <IconButton
              size="md"
              aria-label="profile"
              icon={<CgProfile size={25} />}
            ></IconButton>
          </Link>
        ) : (
          <Flex m={[1, 2]} direction={["column", "row"]} alignItems="flex-end">
            <Link
              as={RouterLink}
              to="/login"
              opacity="0.5"
              m={[1, 2]}
              _hover={{ textDecoration: "none", opacity: 1 }}
            >
              <Button size="md">Sign in</Button>
            </Link>
            <Link
              as={RouterLink}
              to="/register"
              opacity="0.5"
              m={[1, 2]}
              _hover={{ textDecoration: "none", opacity: 1 }}
            >
              <Button size="md">Sign Up</Button>
            </Link>
          </Flex>
        )}
      </Box>
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

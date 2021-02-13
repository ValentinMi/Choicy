import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { IProposal } from "../types";

interface ProposalProps {
  info: IProposal;
  proposalIndex: number;
  onProposalClick: (proposalIndex: number) => Promise<void>;
}

const Proposal: React.FC<ProposalProps> = ({
  info,
  proposalIndex,
  onProposalClick,
}) => {
  return (
    <Box
      className="parent"
      h="50vh"
      w="100%"
      overflow="hidden"
      position="relative"
      onClick={() => onProposalClick(proposalIndex)}
    >
      <Center
        h="100%"
        w="100%"
        className="choice"
        bgImage={`url(${info.imageUrl})`}
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
          bgColor="black"
          borderRadius="10px"
          p="10px"
        >
          {info.title}
        </Heading>
      </Center>
    </Box>
  );
};

export default Proposal;

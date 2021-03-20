import { Box, Center, Heading, keyframes } from "@chakra-ui/react";
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
  const fade = keyframes`
    from { opacity: 0}; }
    to { opacity: 1}; }
  `;

  return (
    <Box
      h="50vh"
      w="100%"
      overflow="hidden"
      position="relative"
      animation={`${fade} ease 2s`}
      onClick={() => onProposalClick(proposalIndex)}
    >
      <Center
        h="100%"
        w="100%"
        bgImage={`url("data:${
          info.image.contentType
        };base64,${info.image.data.toString("base64")}")`}
        backgroundPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        transition="all 1.5s"
        _hover={{ transform: "scale(1.2)" }}
        p={5}
        textAlign="center"
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

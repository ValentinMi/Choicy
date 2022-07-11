import { Box, Button, Heading, keyframes, useColorModeValue } from "@chakra-ui/react";
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
      h={["25vh", "50vh"]}
      w="100%"
      overflow="hidden"
      position="relative"
      animation={`${fade} ease 2s`}
      onClick={() => onProposalClick(proposalIndex)}
    >
      <Button
        h="100%"
        w="100%"
        bgImage={`url("data:${
          info.image.contentType
        };base64,${info.image.data.toString("base64")}")`}
        backgroundPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        transition="all 1.5s"
        p={5}
        cursor="pointer"
        textAlign="center"
        position="relative"
        borderRadius={0}
        aria-label={`Click here to vote for ${info.title}`}
        _hover={{ transform: "scale(1.2)"}}
        _focus={{ transform: "scale(1.2)"}}
        _active={{bgColor: "unset"}}
      >
        <Heading
          as="h2"
          size="lg"
          color={useColorModeValue("black", "white")}
          fontWeight="bold"
          bgColor={useColorModeValue("white", "gray.700")}
          borderRadius="10px"
          p="10px"
        >
          {info.title}
        </Heading>
      </Button>
    </Box>
  );
};

export default Proposal;

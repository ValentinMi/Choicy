import { Progress, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

interface ResultLineProps {
  label: string;
  rate?: number;
}

const ResultLine: React.FC<ResultLineProps> = ({ label, rate }) => {
  return (
    <SimpleGrid columns={3}>
      <Text justifySelf="center">{label}:</Text>
      <Progress
        hasStripe
        value={rate}
        size="lg"
        w="100%"
        alignSelf="center"
        justifySelf="center"
      />
      <Text justifySelf="center">{Math.floor(rate!)} %</Text>
    </SimpleGrid>
  );
};

export default ResultLine;

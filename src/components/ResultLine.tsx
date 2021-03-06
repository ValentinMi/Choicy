import { Progress, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

interface ResultLineProps {
  label: string;
  rate?: number;
}

const ResultLine: React.FC<ResultLineProps> = ({ label, rate }) => {
  return (
    <SimpleGrid columns={[1, 3]}>
      <Text justifySelf="center" mx={3}>
        {label}:
      </Text>
      <Progress
        hasStripe
        value={rate}
        size="lg"
        w="100%"
        alignSelf="center"
        justifySelf="center"
        mx={3}
      />
      <Text justifySelf="center" mx={3}>
        {Math.floor(rate!)} %
      </Text>
    </SimpleGrid>
  );
};

export default ResultLine;

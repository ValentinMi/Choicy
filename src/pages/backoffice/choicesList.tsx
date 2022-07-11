import React, { useEffect, useState } from "react";
import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import { getChoices } from "../../api/choices.api";
import { IChoice } from "../../types";
import ChoiceCard from "../../components/BackOffice/ChoiceCard";

interface ChoicesListProps {}

const ChoicesList: React.FC<ChoicesListProps> = () => {
  const [choices, setChoices] = useState<IChoice[]>([]);

  const fetchChoices = async () => {
    let data = await getChoices();
    setChoices(data);
  };

  useEffect(() => {
    fetchChoices();
  }, []);

  return (
    <Box py={2} px={2}>
      <Heading>Choices list</Heading>

      <Wrap
        display="flex"
        align="stretch"
        spacing="30px"
        py={2}
        px={2}
        sx={{
          ul: {
            margin: 0,
            padding: 0,
            justifyContent: "center",
            width: "100%",
          },
        }}
      >
        {choices.map((choice) => {
          return (
            <WrapItem w={["100%", "100%", "50%", "30%"]} key={choice._id}>
              <ChoiceCard choice={choice} fetchChoices={fetchChoices} />
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
};

export default ChoicesList;

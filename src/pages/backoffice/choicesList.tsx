import React, { useEffect, useState } from "react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { getChoices } from "../../api/choices.api";
import { IChoice } from "../../types";
import ChoiceCard from "../../components/ChoiceCard";

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
    <Wrap
      display="flex"
      align="start"
      spacing="30px"
      pt={5}
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
          <WrapItem key={choice._id}>
            <ChoiceCard choice={choice} fetchChoices={fetchChoices} />
          </WrapItem>
        );
      })}
    </Wrap>
  );
};

export default ChoicesList;

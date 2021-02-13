import axios from "axios";
import ROUTES from "./routes.api";

export const getChoices = async () => {
  try {
    const { data } = await axios.get(ROUTES.CHOICES);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getChoiceById = async (id: string) => {
  try {
    const { data } = await axios.get(ROUTES.CHOICE(id));
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const putProposalChoice = async (
  choideId: string,
  proposalIndex: number
) => {
  try {
    const { data } = await axios.put(
      ROUTES.PROPOSAL_CHOICE(choideId, proposalIndex)
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

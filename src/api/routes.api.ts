const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

const ROUTES = Object.freeze({
  CHOICES: BASE_URL + "/choices",
  CHOICE: (choiceId: string) => BASE_URL + `/choices/${choiceId}`,
  PROPOSAL_CHOICE: (choideId: string, proposalIndex: number) =>
    BASE_URL + `/choices/chosen/${choideId}/${proposalIndex}`,
});

export default ROUTES;

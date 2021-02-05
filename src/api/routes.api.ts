const BASE_URL = "http://172.23.45.178:8000/api";

const ROUTES = Object.freeze({
  CHOICES: BASE_URL + "/choices",
  CHOICE: (choiceId: string) => BASE_URL + `/choices/${choiceId}`,
  PROPOSAL_CHOICE: (choideId: string, proposalIndex: number) =>
    BASE_URL + `/choices/chosen/${choideId}/${proposalIndex}`,
});

export default ROUTES;

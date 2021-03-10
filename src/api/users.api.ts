import axios from "axios";
import { ICredentials } from "../types";
import ROUTES from "./routes.api";

export const register = async (credentials: ICredentials) => {
  try {
    const response = await axios.post(ROUTES.USERS, credentials);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

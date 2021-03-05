import axios from "axios";
import { ICredentials } from "../types";
import ROUTES from "./routes.api";

export const login = async (credentials: ICredentials) => {
  try {
    const { data } = await axios.post(ROUTES.AUTH, credentials);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

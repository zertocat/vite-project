import axios from "axios";
//
import Config from "./config";

const httpCommon = axios.create({
  baseURL: Config.baseURL,
  headers: {
    "Content-type": "application/json",
  },
});
//
export default httpCommon;

import axios from "axios";
import { BASE_URL, TOKEN } from "../config/index";

export const getStation = data => {
  // console.log("inaction", data);
  return {
    type: "GET_STATION",
    payload: axios({
      method: "POST",
      url: `${BASE_URL}/findtrain/station`,
      data
    })
  };
};

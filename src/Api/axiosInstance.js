import axios from "axios";
import AppUrl from "./AppUrl";
import store from "../state/store";

const token = store.getState().user.token;
console.log("token", token);
const axiosInstanceConfig = {
  baseURL: AppUrl.BaseURL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`, // the token is a bearer token
    Accept: "application/json",
  },
};

if (token !== "") {
  axiosInstanceConfig.headers["Authorization"] = `Bearer ${token}`;
}

store.subscribe(() => {
  const newToken = store.getState().user.token;
  axiosInstance.defaults.headers["Authorization"] = newToken
    ? `Bearer ${newToken}`
    : newToken;
  console.log("newToken", newToken);
});

export const axiosInstance = axios.create(axiosInstanceConfig);

import { getCookie } from "./getCookie";

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + getCookie("accessToken"),
  },
};

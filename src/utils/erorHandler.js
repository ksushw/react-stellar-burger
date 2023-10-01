import { refreshToken as responseNewToken } from "../services/actions/registration";
import { getCookie } from "./getCookie";

export async function errorHandler() {
  const { fetch } = window;
  window.fetchAuth = async (...args) => {
    let [link, config] = args;
    let response = await fetch(link, config);
    if (!response.ok && (response.status === 404 || response.status === 403)) {
      await responseNewToken();
      response = await fetch(link, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + getCookie("accessToken"),
        },
      });
    }
    return response;
  };
}

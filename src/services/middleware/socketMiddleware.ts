import { getCookie } from "../../utils/getCookie";

import { Middleware } from "redux";
import { RootState } from "../types";

type socketMiddlewareProps = (
  wsUrl: string,
  wsActions: { [key: string]: string },
) => Middleware<{}, any, any>;

export const socketMiddleware: socketMiddlewareProps = (
  wsUrl,
  wsActions,
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: getCookie("accessToken") };
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  };
};

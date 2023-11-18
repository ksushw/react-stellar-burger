import { getCookie } from "../../utils/getCookie";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: { [key: string]: string },
) => {
  return (store: any) => {
    let socket: WebSocket | null = null;

    return (next: any) => (action: any) => {
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

const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const _getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const getIngridients = () => {
  return fetch(`${config.baseUrl}/ingredients`, {
    headers: config.headers,
  }).then(_getResponseData);
};

export const sendOrder = (order) => {
  return fetch(`${config.baseUrl}/orders`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      ingredients: order,
    }),
  }).then(_getResponseData);
};

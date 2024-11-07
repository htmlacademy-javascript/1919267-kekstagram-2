import { BASE_URL, ErrorText, Method, Route } from './const.js';

const getData = (onSuccess, onFail) => {
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => response.ok ? response.json() : onFail(ErrorText[Method.GET]))
    .then((data) => onSuccess(data))
    .catch(() => onFail(ErrorText[Method.GET]));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(`${BASE_URL}${Route.SEND_DATA}`,
    {
      method: Method.POST,
      body,
    })
    .then((response) => response.ok ? response.json() : onFail(ErrorText[Method.GET]))
    .then((data) => onSuccess(data))
    .catch(() => onFail(ErrorText[Method.GET]));
};

export {getData, sendData};

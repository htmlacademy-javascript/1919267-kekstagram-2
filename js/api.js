import { BASE_URL, ErrorText, Method, Route } from './const.js';

const load = (route, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, {method, body})
  .then((response) => response.ok
    ? response.json()
    : Promise.reject({message: ErrorText[method]}));

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};

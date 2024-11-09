const ALERT_SHOW_TIME = 5000;

const RENDER_COMMENTS_STEP = 5;

const NUMBER_RANDOM_PHOTOS = 10;

const TIME_OUT_DELAY = 500;

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные',
  [Method.POST]: 'Не удалось отправить данные'
};

export {ALERT_SHOW_TIME, RENDER_COMMENTS_STEP, NUMBER_RANDOM_PHOTOS, TIME_OUT_DELAY, BASE_URL, Route, Method, ErrorText};

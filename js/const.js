const ALERT_SHOW_TIME = 5000;

const RENDER_COMMENTS_STEP = 5;

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
  [Method.GET]: 'Упс! Данные не подгрузились :( Попробуйте позже!',
  [Method.POST]: 'Не удалось отправить данные'
};

export {ALERT_SHOW_TIME, RENDER_COMMENTS_STEP, BASE_URL, Route, Method, ErrorText};

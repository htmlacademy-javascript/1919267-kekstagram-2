import { ALERT_SHOW_TIME, NUMBER_RANDOM_PHOTOS, TIME_OUT_DELAY } from './const.js';

//функция для нахождения шаблома в разметке
const findTemplate = (id) => {
  const template = document.querySelector(`#${id}`);

  if (!template) {
    throw new Error(`Template with id ${id} is not found`);
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element with id ${id} is not a template`);
  }

  return template.content.firstElementChild;
};

//функция отрисовки элементов массива в фрагмент
const renderItems = (items, container, createItem) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const newItem = createItem(item);
    fragment.append(newItem);
  });

  container.append(fragment);
};

const getArrayFromString = (string) => string.trim().toLowerCase().split(/\s+/);

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomUniqueElements = (items) => {
  const copyItems = items.slice();
  const elements = [];
  for(let i = 0; i < copyItems.length; i++) {
    const randomElement = getRandomPositiveInteger(0, copyItems.length - 1);
    elements.push(copyItems[randomElement]);
    copyItems.splice(randomElement, 1);
    if (elements.length >= NUMBER_RANDOM_PHOTOS) {
      break;
    }
  }
  return elements;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = TIME_OUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {findTemplate, renderItems, getArrayFromString, getRandomUniqueElements, showAlert, debounce};

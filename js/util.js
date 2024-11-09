import { ALERT_SHOW_TIME, NUMBER_RANDOM_PHOTOS } from './const.js';

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
const renderItems = (array, container, createItem) => {
  const fragment = document.createDocumentFragment();
  array.forEach((item) => {
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

const getRandomUniqueElements = (array) => {
  const newArray = array.slice();
  const elements = [];
  const newArrayLength = array.length;
  for(let i = 0; i < newArrayLength; i++) {
    const randomElement = getRandomPositiveInteger(0, newArray.length - 1);
    elements.push(newArray[randomElement]);
    newArray.splice(randomElement, 1);
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

export {findTemplate, renderItems, getArrayFromString, getRandomUniqueElements, showAlert};

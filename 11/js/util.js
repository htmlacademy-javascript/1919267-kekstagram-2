import { ALERT_SHOW_TIME } from './const.js';

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

export {findTemplate, renderItems, getArrayFromString, showAlert};

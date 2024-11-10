import { ALERT_SHOW_TIME } from './const.js';
import { findTemplate } from './util.js';

const successMessageTemplate = findTemplate('success');
const errorMessageTemplate = findTemplate('error');
const loadErrorMessageTemplate = findTemplate('data-error');

//Функция создания сообщения об ошибке загрузки данных с сервера
const createLoadErrorMessage = () => {
  const documentFragment = document.createDocumentFragment();
  const loadErrorMessageElement = loadErrorMessageTemplate.cloneNode(true);
  documentFragment.append(loadErrorMessageElement);
  document.body.append(documentFragment);

  setTimeout(() => {
    loadErrorMessageElement.remove();
  }, ALERT_SHOW_TIME);
};
// Функции создания и удаления сообщения об успешной загрузке
let successMessageElement, successButtonElement;

const createSuccessMessage = () => {
  const documentFragment = document.createDocumentFragment();
  successMessageElement = successMessageTemplate.cloneNode(true);
  documentFragment.append(successMessageElement);
  document.body.append(documentFragment);
  successButtonElement = successMessageElement.querySelector('.success__button');
};

const removeSuccessMessage = () => {
  successMessageElement.remove();
  document.removeEventListener('keydown', escKeydownOnSuccessMessageHandler);
};

const successMessageElementHandler = (evt) => {
  if (evt.target === successMessageElement) {
    removeSuccessMessage();
  }
};

const addSuccessMessageHandlers = () => {
  successButtonElement.addEventListener('click', removeSuccessMessage);
  successMessageElement.addEventListener('click', successMessageElementHandler);
  document.body.addEventListener('keydown', escKeydownOnSuccessMessageHandler);
  document.addEventListener('click', onOutsideClickHandler);
};

// Функции создания и удаления сообщения о провале загрузки
let errorMessageElement, errorButtonElement;

const createErrorMessage = () => {
  const documentFragment = document.createDocumentFragment();
  errorMessageElement = errorMessageTemplate.cloneNode(true);
  errorMessageElement.style.zIndex = '5';
  documentFragment.append(errorMessageElement);
  document.body.append(documentFragment);
  errorButtonElement = errorMessageElement.querySelector('.error__button');
};

const removeErrorMessage = () => {
  document.body.removeEventListener('keydown', escKeydownOnErrorMessageHandler);
  errorButtonElement.removeEventListener('click', removeErrorMessage);
  document.removeEventListener('click', onOutsideClickHandler);
  errorMessageElement.remove();
};

const errorMessageElementHandler = (evt) => {
  if (evt.target === errorMessageElement) {
    removeErrorMessage();
  }
};

const addErrorMessageHandlers = () => {
  errorButtonElement.addEventListener('click', removeErrorMessage);
  errorMessageElement.addEventListener('click', errorMessageElementHandler);
  document.body.addEventListener('keydown', escKeydownOnErrorMessageHandler);
  document.addEventListener('click', onOutsideClickHandler);
};

function onOutsideClickHandler (evt) {
  const existingElement = document.querySelector('.success') || document.querySelector('.error');
  if (!evt.target.closest('.success__inner') && evt.target === existingElement) {
    removeSuccessMessage();
  }
  if (!evt.target.closest('.error__inner') && evt.target === existingElement) {
    removeErrorMessage();
  }
}

// Функции нажатия ESC

function escKeydownOnSuccessMessageHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function escKeydownOnErrorMessageHandler (evt) {
  evt.stopPropagation();
  const existingElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButtonElement = existingElement.querySelector('button');

  if (evt.target === existingElement || evt.target === closeButtonElement || evt.key === 'Escape') {
    removeErrorMessage();
  }
}

export {createLoadErrorMessage, createSuccessMessage, createErrorMessage, addSuccessMessageHandlers, addErrorMessageHandlers};


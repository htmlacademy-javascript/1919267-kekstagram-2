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

const successMessageButtonClickHandler = () => {
  successMessageElement.remove();
  document.removeEventListener('keydown', successMessageKeydownHandler);
};

const successMessageElementClickHandler = (evt) => {
  if (evt.target === successMessageElement) {
    successMessageButtonClickHandler();
  }
};

const addSuccessMessageHandlers = () => {
  successButtonElement.addEventListener('click', successMessageButtonClickHandler);
  successMessageElement.addEventListener('click', successMessageElementClickHandler);
  document.body.addEventListener('keydown', successMessageKeydownHandler);
  document.addEventListener('click', outsideElementClickHandler);
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

const errorMessageButtonClickHandler = () => {
  document.body.removeEventListener('keydown', errorMessageKeydownHandler);
  errorButtonElement.removeEventListener('click', errorMessageButtonClickHandler);
  document.removeEventListener('click', outsideElementClickHandler);
  errorMessageElement.remove();
};

const errorMessageElementClickHandler = (evt) => {
  if (evt.target === errorMessageElement) {
    errorMessageButtonClickHandler();
  }
};

const addErrorMessageHandlers = () => {
  errorButtonElement.addEventListener('click', errorMessageButtonClickHandler);
  errorMessageElement.addEventListener('click', errorMessageElementClickHandler);
  document.body.addEventListener('keydown', errorMessageKeydownHandler);
  document.addEventListener('click', outsideElementClickHandler);
};

function outsideElementClickHandler (evt) {
  const existingElement = document.querySelector('.success') || document.querySelector('.error');
  if (!evt.target.closest('.success__inner') && evt.target === existingElement) {
    successMessageButtonClickHandler();
  }
  if (!evt.target.closest('.error__inner') && evt.target === existingElement) {
    errorMessageButtonClickHandler();
  }
}

// Функции нажатия ESC

function successMessageKeydownHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    successMessageButtonClickHandler();
  }
}

function errorMessageKeydownHandler (evt) {
  evt.stopPropagation();
  const existingElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButtonElement = existingElement.querySelector('button');

  if (evt.target === existingElement || evt.target === closeButtonElement || evt.key === 'Escape') {
    errorMessageButtonClickHandler();
  }
}

export {createLoadErrorMessage, createSuccessMessage, createErrorMessage, addSuccessMessageHandlers, addErrorMessageHandlers};


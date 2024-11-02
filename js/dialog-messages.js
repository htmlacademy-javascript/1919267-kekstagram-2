import { findTemplate } from './util.js';

const successMessageTemplate = findTemplate('success');
const errorMessageTemplate = findTemplate('error');

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
  document.addEventListener('keydown', escKeydownOnSuccessMessageHandler);
  window.addEventListener('click', removeSuccessMessage);
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
  document.removeEventListener('keydown', escKeydownOnErrorMessageHandler);
  errorButtonElement.removeEventListener('click', removeErrorMessage);
  window.removeEventListener('click', removeErrorMessage);
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
  document.addEventListener('keydown', escKeydownOnErrorMessageHandler);
  window.addEventListener('click', removeErrorMessage);
};

// Функции нажатия ESC

function escKeydownOnSuccessMessageHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function escKeydownOnErrorMessageHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeErrorMessage();
  }
}

export {createSuccessMessage, createErrorMessage, addSuccessMessageHandlers, addErrorMessageHandlers};


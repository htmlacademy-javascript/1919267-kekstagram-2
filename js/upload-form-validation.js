import { addErrorMessageHandlers, addSuccessMessageHandlers, createErrorMessage, createSuccessMessage } from './dialog-messages.js';
import { closeUploadForm } from './upload-form.js';

const MAX_NUMBER_OF_HASHTAGS = 5;
const HASHTAG_MAX_LENGTH = 20;
const MAX_IMAGE__DESCRIPTION__LENGTH = 140;
const REG_EXP = /^#[a-zа-яё0-9]*$/i;

const uploadFormElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const photoDescriptionInputElement = uploadFormElement.querySelector('.text__description');

// Функции для валидации хештегов

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const validateHashtagContent = (value) => {
  if (value === '') {
    return true;
  }

  const arrayOfMessages = value.trim().split(/\s+/);
  return arrayOfMessages.every((item) => REG_EXP.test(item));
};

const isValidLength = (value) => {
  if (value === '') {
    return true;
  }

  const arrayOfMessages = value.trim().split(/\s+/);
  return arrayOfMessages.every((item) => item.length <= HASHTAG_MAX_LENGTH);
};

const checkNumberOfHashtags = (value) => {
  const arrayOfMessages = value.trim().split(/\s+/);
  return arrayOfMessages.length <= MAX_NUMBER_OF_HASHTAGS;
};

const findSameElements = (value) => {
  const arrayOfMessages = value.trim().toLowerCase().split(/\s+/);
  return arrayOfMessages.every((item, index, array) => array.slice(index + 1, array.length).every((elem) => elem !== item));
};

const checkEmptyTags = (value) => {
  const re = /^#\s+/;
  return !re.test(value);
};

const checkSpaces = (value) => {
  const re = /[0-9a-z_]#$/;
  return !re.test(value);
};

const checkHashtagFirstSymbol = (value) => {
  if (value === '') {
    return true;
  }
  return value.trim().split(' ').filter((word) => word !== '').every((word) => word.startsWith('#'));
};

const addFormValidation = () => {
  // Валидация хештегов

  pristine.addValidator(hashtagsInputElement, checkNumberOfHashtags, `Нельзя указать больше ${MAX_NUMBER_OF_HASHTAGS} хэш-тегов`, false);

  pristine.addValidator(hashtagsInputElement, checkHashtagFirstSymbol, 'Хэш-тег должен начинаться с символа #', true);

  pristine.addValidator(hashtagsInputElement, checkSpaces, 'Хеш-теги должны разделяться пробелами', false);

  pristine.addValidator(hashtagsInputElement, findSameElements, 'Хеш-теги не должны повторяться', false);

  pristine.addValidator(hashtagsInputElement, validateHashtagContent, 'Хэш-тег после # должен состоять только из букв и цифр', false);

  pristine.addValidator(hashtagsInputElement, checkEmptyTags, 'Хеш-теги не должны состоять только из #', false);

  pristine.addValidator(hashtagsInputElement, isValidLength, `Длина хеш-тега должна быть не более ${HASHTAG_MAX_LENGTH} символов`, true);

  // Валидация комментариев

  pristine.addValidator(photoDescriptionInputElement, (text) => text.length < MAX_IMAGE__DESCRIPTION__LENGTH, `Длина комментария не может быть больше ${MAX_IMAGE__DESCRIPTION__LENGTH} символов`);

  // Отправка формы

  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValidFrom = pristine.validate();

    if (isValidFrom) {
      closeUploadForm();
      createSuccessMessage();
      addSuccessMessageHandlers();
    } else {
      createErrorMessage();
      addErrorMessageHandlers();
    }
  });
};

export {addFormValidation};

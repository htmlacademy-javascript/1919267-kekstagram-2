import { sendData } from './api.js';
import { addErrorMessageHandlers, addSuccessMessageHandlers, createErrorMessage, createSuccessMessage } from './dialog-messages.js';
import { closeUploadForm } from './upload-form.js';
import { getArrayFromString } from './util.js';

const MAX_NUMBER_OF_HASHTAGS = 5;
const HASHTAG_MAX_LENGTH = 20;
const MAX_IMAGE__DESCRIPTION__LENGTH = 140;
const REG_EXP = /^#[a-zа-яё0-9]*$/i;

const uploadFormElement = document.querySelector('#upload-select-image');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const photoDescriptionInputElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

// Функции для валидации хештегов

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateHashtagContent = (value) => {
  if (value === '') {
    return true;
  }

  return getArrayFromString(value).every((item) => REG_EXP.test(item));
};

const isValidLength = (value) => {
  if (value === '') {
    return true;
  }

  return getArrayFromString(value).every((item) => item.length <= HASHTAG_MAX_LENGTH);
};

const checkNumberOfHashtags = (value) => getArrayFromString(value).length <= MAX_NUMBER_OF_HASHTAGS;

const findSameElements = (value) => getArrayFromString(value)
  .every((item, index, elements) => elements.slice(index + 1, elements.length)
    .every((elem) => elem !== item));

const checkEmptyTags = (value) => !value.endsWith('#');

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

  pristine.addValidator(hashtagsInputElement, checkEmptyTags, 'Хеш-теги не должны состоять только из #', 1, true);

  pristine.addValidator(hashtagsInputElement, checkSpaces, 'Хеш-теги должны разделяться пробелами', false);

  pristine.addValidator(hashtagsInputElement, findSameElements, 'Хеш-теги не должны повторяться', false);

  pristine.addValidator(hashtagsInputElement, validateHashtagContent, 'Хэш-тег после # должен состоять только из букв и цифр', true);

  pristine.addValidator(hashtagsInputElement, isValidLength, `Длина хеш-тега должна быть не более ${HASHTAG_MAX_LENGTH} символов`, true);

  // Валидация комментариев

  pristine.addValidator(photoDescriptionInputElement, (text) => text.length < MAX_IMAGE__DESCRIPTION__LENGTH, `Длина комментария не может быть больше ${MAX_IMAGE__DESCRIPTION__LENGTH} символов`);

  // Отправка формы
  const blockSubmitButton = () => {
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = 'Публикую...';
  };

  const unblockSubmitButton = () => {
    submitButtonElement.disabled = false;
    submitButtonElement.textContent = 'Опубликовать';
  };

  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValidForm = pristine.validate();

    if (isValidForm) {
      hashtagsInputElement.value = hashtagsInputElement.value.trim().replaceAll(/\s+/g, ' ');
      const formData = new FormData(uploadFormElement);

      blockSubmitButton();

      sendData(formData)
        .then(() => {
          closeUploadForm();
          createSuccessMessage();
          addSuccessMessageHandlers();
        })
        .catch(() => {
          createErrorMessage();
          addErrorMessageHandlers();
        })
        .finally(() => unblockSubmitButton());
    }
  });
};

const resetValidation = () => pristine.reset();

export {addFormValidation, resetValidation};

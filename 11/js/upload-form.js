import { initEffect, resetEffect } from './photo-effects.js';
import { addImagePreviewScale, resetScale } from './photo-scale.js';
import { resetValidation } from './upload-form-validation.js';

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
const uploadCancelButtonElement = uploadFormElement.querySelector('#upload-cancel');
const imageUploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const photoDescriptionInputElement = uploadFormElement.querySelector('.text__description');

const initUploadForm = () => {
  uploadFileInputElement.addEventListener('change', ()=> {
    imageUploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', escapeKeyDownHandler);
    uploadCancelButtonElement.addEventListener('click', closeUploadForm);
  });
  addImagePreviewScale();
  initEffect();
};

function closeUploadForm () {
  imageUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyDownHandler);
  uploadCancelButtonElement.removeEventListener('click', closeUploadForm);
  uploadFileInputElement.value = '';
  uploadFormElement.reset();
  resetValidation();
  resetEffect();
  resetScale();
}

function escapeKeyDownHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === hashtagsInputElement || document.activeElement === photoDescriptionInputElement) {
      evt.stopPropagation();
    } else {
      uploadFormElement.reset();
      closeUploadForm();
    }
  }
}

export {closeUploadForm, initUploadForm};

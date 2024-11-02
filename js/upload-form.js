import { addImagePreviewScale } from "./photo-effects";

const uploadFormElement = document.querySelector('#upload-select-image');
const uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
const uploadCancelButtonElement = uploadFormElement.querySelector('#upload-cancel');
const imageUploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');

const openUploadForm = () => {
  imageUploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeyDownHandler);
  addImagePreviewScale();
};

const closeUploadForm = () => {
  imageUploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyDownHandler);
  uploadFormElement.reset();
};

function escapeKeyDownHandler (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
  }
}

uploadFileInputElement.addEventListener('change', openUploadForm);
uploadCancelButtonElement.addEventListener('click', closeUploadForm);

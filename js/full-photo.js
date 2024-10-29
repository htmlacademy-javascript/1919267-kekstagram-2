import { clearComments, renderComments } from './render-comments.js';

const fullPhotoElement = document.querySelector('.big-picture');
const closeButtonElement = fullPhotoElement.querySelector('.big-picture__cancel');

const closeButtonHandler = () => {
  fullPhotoElement.classList.add('hidden');
  closeFullPhoto();
};

const escapeKeyDownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const fillPhotoInfo = (photo) => {
  const image = fullPhotoElement.querySelector('img');
  image.src = photo.url;
  image.alt = photo.description;
  fullPhotoElement.querySelector('.social__caption').textContent = photo.description;
  fullPhotoElement.querySelector('.likes-count').textContent = photo.likes;
  fullPhotoElement.querySelector('.social__comment-total-count').textContent = photo.comments.length;
};

function closeFullPhoto () {
  clearComments();
  fullPhotoElement.classList.add('hidden');
  closeButtonElement.removeEventListener('click', closeButtonHandler);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyDownHandler);
}

const openFullPhoto = (photo) => {
  fillPhotoInfo(photo);
  renderComments(photo.comments);

  fullPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeButtonHandler);
  closeButtonElement.focus();
  document.addEventListener('keydown', escapeKeyDownHandler);
};

export {openFullPhoto};

import { renderItems } from './util.js';

const fullPhotoElement = document.querySelector('.big-picture');
const closeButtonElement = fullPhotoElement.querySelector('.big-picture__cancel');
const commentsListElement = fullPhotoElement.querySelector('.social__comments');
const commentElement = commentsListElement.querySelector('.social__comment');

const closeButtonHandler = () => {
  fullPhotoElement.classList.add('hidden');
};

const escapeKeyDownHandler = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullPhoto();
  }
};

const createComment = (comment) => {
  const newComment = commentElement.cloneNode(true);

  const image = newComment.querySelector('.social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const fillPhotoInfo = (photo) => {
  const image = fullPhotoElement.querySelector('img');
  image.src = photo.url;
  image.alt = photo.description;
  fullPhotoElement.querySelector('.social__caption').textContent = photo.description;
  fullPhotoElement.querySelector('.likes-count').textContent = photo.likes;
  fullPhotoElement.querySelector('.social__comment-count').classList.add('hidden');
  fullPhotoElement.querySelector('.comments-loader').classList.add('hidden');
  commentsListElement.innerHTML = '';

  renderItems(photo.comments, commentsListElement, createComment);
};

function closeFullPhoto () {
  fullPhotoElement.classList.add('hidden');
  closeButtonElement.removeEventListener('click', closeButtonHandler);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyDownHandler);
}

const openFullPhoto = (photo) => {
  fillPhotoInfo(photo);

  fullPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeButtonHandler);
  closeButtonElement.focus();
  document.addEventListener('keydown', escapeKeyDownHandler);
};

export {openFullPhoto};

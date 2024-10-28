import { RENDER_COMMENTS_STEP } from './const.js';
import { renderItems } from './util';

let currentCommentsCount = 0;
let comments = [];

const fullPhotoElement = document.querySelector('.big-picture');
const commentsListElement = fullPhotoElement.querySelector('.social__comments');
const commentElement = commentsListElement.querySelector('.social__comment');
const loadMoreButtonElement = fullPhotoElement.querySelector('.comments-loader');
const commentsShownCountElement = fullPhotoElement.querySelector('.social__comment-shown-count');
commentsListElement.innerHTML = '';

const createComment = (comment) => {
  const newComment = commentElement.cloneNode(true);

  const image = newComment.querySelector('.social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const renderNextComments = () => {
  if (comments.length === 0) {
    fullPhotoElement.querySelector('.social__comment-count').innerHTML = `<span
    class="social__comment-total-count">${comments.length}</span> комментариев`;
  }
  const commentsShown = comments.slice(currentCommentsCount, currentCommentsCount + RENDER_COMMENTS_STEP);
  const shownCommentsLength = commentsShown.length + currentCommentsCount;
  commentsShownCountElement.textContent = shownCommentsLength;

  renderItems(commentsShown, commentsListElement, createComment);

  if (shownCommentsLength >= comments.length) {
    commentsShownCountElement.textContent = comments.length;
    loadMoreButtonElement.classList.add('hidden');
  }

  currentCommentsCount += RENDER_COMMENTS_STEP;
};

const clearComments = () => {
  currentCommentsCount = 0;
  comments = [];
  commentsListElement.innerHTML = '';
  loadMoreButtonElement.classList.remove('hidden');
  loadMoreButtonElement.removeEventListener('click', renderNextComments);
};

const renderComments = (photoComments) => {
  comments = photoComments;
  renderNextComments();

  loadMoreButtonElement.addEventListener('click', renderNextComments);
};

export {renderComments, clearComments};

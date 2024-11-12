import { openFullPhoto } from './full-photo.js';
import { findTemplate, renderItems } from './util.js';

const thumbnailTemplate = findTemplate('picture');
const thumbnailsContainerElement = document.querySelector('.pictures');
let thumbnails = [];

const createThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailImage = thumbnail.querySelector('.picture__img');
  thumbnailImage.src = photo.url;
  thumbnailImage.alt = photo.description;
  thumbnail.dataset.photoId = photo.id;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

const getCurrentPhoto = (photoId) => thumbnails.find((item) => item.id === parseInt(photoId, 10));

const thumbnailClickHandler = (evt) => {
  if(evt.target.closest('img')) {
    const photoId = evt.target.parentNode.dataset.photoId;
    openFullPhoto(getCurrentPhoto(photoId));
  }
};

const initThumbnails = (photos) => {
  thumbnails = photos;
  thumbnailsContainerElement.addEventListener('click', thumbnailClickHandler);
  renderItems(photos, thumbnailsContainerElement, createThumbnail);
};

export {initThumbnails, createThumbnail};

import {generatePhotos} from './data.js';
import {PHOTOS_COUNT} from './const.js';
import { findTemplate } from './util.js';

const thumbnailsContainerElement = document.querySelector('.pictures');
const thumbnailTemplate = findTemplate('picture');

const thumbnailsFragment = document.createDocumentFragment();

const createThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailImage = thumbnail.querySelector('.picture__img');
  thumbnailImage.src = photo.url;
  thumbnailImage.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

const similarPhotos = generatePhotos(PHOTOS_COUNT);

similarPhotos.forEach((photo) => {
  const newThumbnail = createThumbnail(photo);
  thumbnailsFragment.append(newThumbnail);
});

thumbnailsContainerElement.append(thumbnailsFragment);

import {generatePhotos} from './data.js';
import {PHOTOS_COUNT} from './const.js';

const similarThumbnails = generatePhotos(PHOTOS_COUNT);

const thumbnailsContainerElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsFragment = document.createDocumentFragment();

similarThumbnails.forEach(({url, description, comments, likes}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);

  const newThumbnailImage = newThumbnail.querySelector('.picture__img');
  newThumbnailImage.src = url;
  newThumbnailImage.alt = description;

  newThumbnail.querySelector('.picture__comments').textContent = comments.length;
  newThumbnail.querySelector('.picture__likes').textContent = likes;

  thumbnailsFragment.append(newThumbnail);
});

thumbnailsContainerElement.append(thumbnailsFragment);

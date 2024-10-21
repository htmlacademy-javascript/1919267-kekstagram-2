import { findTemplate } from './util.js';

const thumbnailTemplate = findTemplate('picture');

const createThumbnail = (photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const thumbnailImage = thumbnail.querySelector('.picture__img');
  thumbnailImage.src = photo.url;
  thumbnailImage.alt = photo.description;

  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;

  return thumbnail;
};

const renderThumbnails = (array) => {
  const thumbnailsContainerElement = document.querySelector('.pictures');
  const thumbnailsFragment = document.createDocumentFragment();

  array.forEach((photo) => {
    const newThumbnail = createThumbnail(photo);
    thumbnailsFragment.append(newThumbnail);
  });

  thumbnailsContainerElement.append(thumbnailsFragment);
};

export {renderThumbnails};

import { createThumbnail } from './thumbnails.js';
import { debounce, getRandomUniqueElements, renderItems } from './util.js';

const sectionFiltersElement = document.querySelector('.img-filters');
const filterButtonElements = document.querySelectorAll('.img-filters__button');
const thumbnailsContainerElement = document.querySelector('.pictures');
let photosForFilter = [];

const comparePhotoComments = (elementA, elementB) => elementB.comments.length - elementA.comments.length;

const filterPhotosByDefault = () => photosForFilter.slice();

const filterPhotosByRandom = () => {
  const newPhotosArray = photosForFilter.slice();
  return getRandomUniqueElements(newPhotosArray);
};

const filterPhotosByDiscussed = () => {
  const newPhotosArray = photosForFilter.slice();
  return newPhotosArray.sort(comparePhotoComments);
};

const deleteActiveClass = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
};

const clearPhotosContainer = () => {
  const photosAllElements = document.querySelectorAll('.picture');
  photosAllElements.forEach((photo) => {
    photo.remove();
  });
};

const renderFilteredPhotos = (photos) => {
  clearPhotosContainer();
  renderItems(photos, thumbnailsContainerElement, createThumbnail);
};


const filterButtonClickHandler = debounce((target) => {
  deleteActiveClass();
  clearPhotosContainer();
  target.classList.add('img-filters__button--active');
  switch (target.id) {
    case 'filter-random':
      renderFilteredPhotos(filterPhotosByRandom());
      break;
    case 'filter-discussed':
      renderFilteredPhotos(filterPhotosByDiscussed());
      break;
    default:
      renderFilteredPhotos(filterPhotosByDefault());
  }
});

const initFilters = (photos) => {
  photosForFilter = photos;
  sectionFiltersElement.classList.remove('img-filters--inactive');
  filterButtonElements.forEach((element) => element.addEventListener('click', (evt) => filterButtonClickHandler(evt.target)));
};

export {initFilters};

import './thumbnails.js';
import './upload-form.js';
import {generatePhotos} from './data.js';
import {PHOTOS_COUNT} from './const.js';
import { initThumbnails } from './thumbnails.js';
import { addFormValidation } from './upload-form-validation.js';

const similarPhotos = generatePhotos(PHOTOS_COUNT);
addFormValidation();

initThumbnails(similarPhotos);


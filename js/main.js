import './thumbnails.js';
import './upload-form.js';
import {generatePhotos} from './data.js';
import {PHOTOS_COUNT} from './const.js';
import { initThumbnails } from './thumbnails.js';
import { inputUploadChangeHandler } from './upload-form.js';
import { addFormValidation } from './upload-form-validation.js';

const similarPhotos = generatePhotos(PHOTOS_COUNT);
inputUploadChangeHandler();
addFormValidation();

initThumbnails(similarPhotos);


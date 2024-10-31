import './thumbnails.js';
import './upload-form.js';
import {generatePhotos} from './data.js';
import {PHOTOS_COUNT} from './const.js';
import { initThumbnails } from './thumbnails.js';

const similarPhotos = generatePhotos(PHOTOS_COUNT);

initThumbnails(similarPhotos);


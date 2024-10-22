import './thumbnails.js';
import {generatePhotos} from './data.js';
import {PHOTOS_COUNT} from './const.js';
import { renderThumbnails } from './thumbnails.js';

const similarPhotos = generatePhotos(PHOTOS_COUNT);

renderThumbnails(similarPhotos);

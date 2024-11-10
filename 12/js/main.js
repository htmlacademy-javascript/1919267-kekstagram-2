import { initThumbnails } from './thumbnails.js';
import {initUploadForm} from './upload-form.js';
import { addFormValidation } from './upload-form-validation.js';
import { getData } from './api.js';
import { initFilters } from './photo-filters.js';
import { createLoadErrorMessage } from './dialog-messages.js';

getData()
  .then((dataFromServer) => {
    initThumbnails(dataFromServer);
    initFilters(dataFromServer);
  })
  .catch((error) => {
    createLoadErrorMessage(error.message);
  });
initUploadForm();
addFormValidation();

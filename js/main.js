import { initThumbnails } from './thumbnails.js';
import {initUploadForm} from './upload-form.js';
import { addFormValidation } from './upload-form-validation.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((dataFromServer) => {
    initThumbnails(dataFromServer);
  })
  .catch((error) => {
    showAlert(error.message);
  });
initUploadForm();
addFormValidation();

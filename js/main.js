import { initThumbnails } from './thumbnails.js';
import {initUploadForm} from './upload-form.js';
import { addFormValidation } from './upload-form-validation.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData(
  (dataFromServer) => {
    initThumbnails(dataFromServer);
  },
  (error) => {
    showAlert(error);
  }
);
initUploadForm();
addFormValidation();

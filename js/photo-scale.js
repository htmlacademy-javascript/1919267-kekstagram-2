// Константы для масштабирования изображения

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;

const uploadFormElement = document.querySelector('#upload-select-image');
const scaleSmallerButtonElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = uploadFormElement.querySelector('.scale__control--bigger');
const scaleValueInputElement = uploadFormElement.querySelector('.scale__control--value');
const imageUploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview').querySelector('img');

// изменение масштаба изображения

let scaleValue = DEFAULT_SCALE_VALUE;

const changeScaleValueInHTML = () => {
  imageUploadPreviewElement.style.transform = `scale(${scaleValue / 100})`;
  scaleValueInputElement.value = `${scaleValue}%`;
};

const scaleBiggerButtonClickHandler = () => {
  if (scaleValue + SCALE_VALUE_STEP <= MAX_SCALE_VALUE) {
    scaleValue += SCALE_VALUE_STEP;
    changeScaleValueInHTML();
  }
};

const scaleSmallerButtonClickHandler = () => {
  if (scaleValue - SCALE_VALUE_STEP >= MIN_SCALE_VALUE) {
    scaleValue -= SCALE_VALUE_STEP;
    changeScaleValueInHTML();
  }
};

const resetScale = () => {
  imageUploadPreviewElement.style.transform = `scale(${DEFAULT_SCALE_VALUE / 100})`;
  scaleValueInputElement.value = `${DEFAULT_SCALE_VALUE}%`;
  scaleValue = DEFAULT_SCALE_VALUE;
};

const addImagePreviewScale = () => {
  scaleBiggerButtonElement.addEventListener('click', scaleBiggerButtonClickHandler);
  scaleSmallerButtonElement.addEventListener('click', scaleSmallerButtonClickHandler);
};

export {addImagePreviewScale, resetScale};

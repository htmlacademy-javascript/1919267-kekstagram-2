// Константы для наложения эффекта на изображение
const Effects = {
  CHROME: {range: {min: 0, max: 1}, step: 0.1, start: 1, style: 'grayscale', unit: ''},
  SEPIA: {range: {min: 0, max: 1}, step: 0.1, start: 1, style: 'sepia', unit: ''},
  MARVIN: {range: {min: 0, max: 100}, step: 1, start: 100, style: 'invert', unit: '%'},
  PHOBOS: {range: {min: 0, max: 3}, step: 0.1, start: 3, style: 'blur', unit: 'px'},
  HEAT: {range: {min: 1, max: 3}, step: 0.1, start: 3, style: 'brightness', unit: ''},
  NONE: {range: {min: 0, max: 1}, step: 0.1, start: 1, style: 'none', unit: ''}
};

const uploadFormElement = document.querySelector('#upload-select-image');
const listOfEffectsContainer = uploadFormElement.querySelector('.effects__list');
const effectLevelFieldsetElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelValueInputElement = uploadFormElement.querySelector('.effect-level__value');
const effectLevelSliderElement = uploadFormElement.querySelector('.effect-level__slider');
const imageUploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview').querySelector('img');

const defaultEffect = 'NONE';
let currentEffect = defaultEffect;

// добавление эффектов на изображение
function createSlider (effect) {
  const {range, step, start} = effect;
  noUiSlider.create(effectLevelSliderElement, {
    range: {
      min: range.min,
      max: range.max,
    },
    step,
    start,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  effectLevelSliderElement.noUiSlider.on('update', sliderUpdateHandler);
  hideSlider();
}

function setImageStyle (effectValue) {
  if (currentEffect === defaultEffect) {
    imageUploadPreviewElement.style.filter = null;
  } else {
    const style = Effects[currentEffect].style;
    const unit = Effects[currentEffect].unit;
    imageUploadPreviewElement.style.filter = `${style}(${effectValue}${unit})`;
  }
}

function sliderUpdateHandler () {
  const currentValue = effectLevelSliderElement.noUiSlider.get();
  effectLevelValueInputElement.value = currentValue;
  setImageStyle(currentValue);
}

function effectsListElementChangeHandler (evt) {
  const effect = evt.target.value.toUpperCase();
  setEffect(effect);
}

const showSlider = () => {
  effectLevelSliderElement.classList.remove('hidden');
  effectLevelFieldsetElement.classList.remove('hidden');
};

function hideSlider () {
  effectLevelSliderElement.classList.add('hidden');
  effectLevelFieldsetElement.classList.add('hidden');
}

function setEffect (effect) {
  currentEffect = effect;
  if (currentEffect === defaultEffect) {
    hideSlider();
  } else {
    showSlider();
  }
  setSliderOptions();
}

function setSliderOptions () {
  const {range, step} = Effects[currentEffect];
  effectLevelSliderElement.noUiSlider.updateOptions({
    range: {
      min: range.min,
      max: range.max,
    },
    start: range.max,
    step,
  });
}

const initEffect = () => {
  createSlider(Effects[defaultEffect]);
  listOfEffectsContainer.addEventListener('change', effectsListElementChangeHandler);
};

function resetEffect () {
  listOfEffectsContainer.querySelector('input[type="radio"]:first-child').checked = true;
  setEffect(defaultEffect);
}

export {initEffect, resetEffect};

// Константы для наложения эффекта на изображение
const EFFECT_PARAMETERS = {
  'chrome': {range: {min: 0, max: 1}, step: 0.1, start: 1, style: 'grayscale', unit: ''},
  'sepia': {range: {min: 0, max: 1}, step: 0.1, start: 1, style: 'sepia', unit: ''},
  'marvin': {range: {min: 0, max: 100}, step: 1, start: 100, style: 'invert', unit: '%'},
  'phobos': {range: {min: 0, max: 3}, step: 0.1, start: 3, style: 'blur', unit: 'px'},
  'heat': {range: {min: 1, max: 3}, step: 0.1, start: 3, style: 'brightness', unit: ''},
};

const uploadFormElement = document.querySelector('#upload-select-image');
const listOfEffectsContainer = uploadFormElement.querySelector('.effects__list');
const effectLevelFieldsetElement = uploadFormElement.querySelector('.img-upload__effect-level');
const effectLevelValueInputElement = uploadFormElement.querySelector('.effect-level__value');
const effectLevelSliderElement = uploadFormElement.querySelector('.effect-level__slider');
const imageUploadPreviewElement = uploadFormElement.querySelector('.img-upload__preview').querySelector('img');

// добавление эффектов на изображение
noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
  start: 1,
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

const showSlider = () => {
  effectLevelSliderElement.classList.remove('hidden');
  effectLevelFieldsetElement.classList.remove('hidden');
  effectLevelValueInputElement.value = '';
};

const addClassToPreviewImage = (string) => {
  imageUploadPreviewElement.classList.add(`effects__preview--${string}`);
};

const hideSlider = () => {
  effectLevelSliderElement.classList.add('hidden');
  effectLevelFieldsetElement.classList.add('hidden');
  imageUploadPreviewElement.style.filter = '';
};

const addEffectFilterToPreview = (filter, filterValue) => {
  const filterName = EFFECT_PARAMETERS[filter].style;
  const filterUnit = EFFECT_PARAMETERS[filter].unit;
  imageUploadPreviewElement.style.filter = `${filterName}(${filterValue}${filterUnit})`;
  effectLevelValueInputElement.value = `${filterValue}${filterUnit}`;
};

const addSlider = (item) => {
  if (item.value === 'none') {
    hideSlider();
  } else {
    effectLevelSliderElement.noUiSlider.updateOptions(EFFECT_PARAMETERS[`${item.value}`]);
    showSlider();
    addEffectFilterToPreview(item.value, effectLevelSliderElement.noUiSlider.get());
    addClassToPreviewImage(item.value);
    effectLevelValueInputElement.value = effectLevelSliderElement.noUiSlider.get();
    effectLevelSliderElement.noUiSlider.on('update', () => {
      addEffectFilterToPreview(item.value, effectLevelSliderElement.noUiSlider.get());
    });
  }
};

const addEffectsToPreviewImage = () => {
  effectLevelFieldsetElement.classList.add('hidden');
  imageUploadPreviewElement.style.filter = '';
  imageUploadPreviewElement.removeAttribute('class');
  imageUploadPreviewElement.classList.add('effects__preview--none');
  listOfEffectsContainer.addEventListener('change', (evt) => {
    if (evt.target.name === 'effect') {
      imageUploadPreviewElement.removeAttribute('class');
      addSlider(evt.target);
    }
  });
};

export {addEffectsToPreviewImage};

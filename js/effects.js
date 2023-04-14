import { imageUploadPreview } from './scale.js';

const EFFECTS = {
  none: createEffect('none', 'none', 0, 100, 1, ''),
  chrome: createEffect('chrome', 'grayscale', 0, 1, 0.1, ''),
  sepia: createEffect('sepia', 'sepia', 0, 1, 0.1, ''),
  marvin: createEffect('marvin', 'invert', 0, 100, 1, '%'),
  phobos: createEffect('phobos', 'blur', 0, 3, 0.1, 'px'),
  heat: createEffect('heat', 'brightness', 1, 3, 0.1, ''),
};

const DEFAULT_EFFECTS_VALUE = 100;
const DEFAULT_EFFECT = EFFECTS.none;

function createEffect(name, style, min, max, step, unit) {
  return {
    name: name,
    style: style,
    min: min,
    max: max,
    step: step,
    unit: unit,
  };
}

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsElement = document.querySelector('.effects');
const effectLevelElement = document.querySelector('.effect-level__value');

let currentEffect = DEFAULT_EFFECT;

const isDeffaultEffect = () => currentEffect === DEFAULT_EFFECT;

const hideSlider = () => sliderContainer.classList.add('hidden');

const showSlider = () => sliderContainer.classList.remove('hidden');

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.max,
  });

  if (isDeffaultEffect()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS[evt.target.value];
  imageUploadPreview.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};

effectsElement.addEventListener('change', onEffectsChange);

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  if (isDeffaultEffect()) {
    imageUploadPreview.style.filter = DEFAULT_EFFECT.style;
  } else {
    imageUploadPreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  }
  effectLevelElement.value = sliderValue;
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

window.noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECTS_VALUE,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

hideSlider();

sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };

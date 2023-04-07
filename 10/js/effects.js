import { imageUploadPreview } from './scale.js';

// Массив объектов с описанием различных эффектов для обработки изображений
const EFFECTS_FILTER = [
  createEffect('none', 'none', 0, 100, 1, ''),
  createEffect('chrome', 'grayscale', 0, 1, 0.1, ''),
  createEffect('sepia', 'sepia', 0, 1, 0.1, ''),
  createEffect('marvin', 'invert', 0, 100, 1, '%'),
  createEffect('phobos', 'blur', 0, 3, 0.1, 'px'),
  createEffect('heat', 'brightness', 1, 3, 0.1, ''),
];

const DEFAULT_EFFECTS_VALUE = 100;
const DEFAULT_EFFECT = EFFECTS_FILTER[0];

// Функция-фабрика для создания объектов эффектов
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

// Функция-проверка на эффект по умолчанию
const isDeffaultEffect = () => currentEffect === DEFAULT_EFFECT;

// Функция по скрытию слайдера
const hideSlider = () => sliderContainer.classList.add('hidden');

// Функция по показу слайдера
const showSlider = () => sliderContainer.classList.remove('hidden');

//Функция по обновлению слайдера в зависимости от текущего эффекта
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
  // sliderContainer.classList.toggle('hidden', isDefaultEffect()); // замена двух функций или же использоать if
};

//Обработчик для изменения эффектов
const onEffectsChange = (evt) => { //Когда пользователь выбирает новый эффект, текущий эффект обновляется
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS_FILTER.find((effect) => effect.name === evt.target.value);
  imageUploadPreview.className = `effects__preview--${currentEffect.name}`;
  updateSlider(); // Слайдер обновляется в соответствии с новым эффектом.
};

effectsElement.addEventListener('change', onEffectsChange);

//Обработчик обновления изображения при изменении значения слайдера
const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  if (isDeffaultEffect()) {
    imageUploadPreview.style.filter = DEFAULT_EFFECT.style;
  } else {
    imageUploadPreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  }
  effectLevelElement.value = sliderValue;
};

//Функция по сбросу эффектов
const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

// Создание слайдера
window.noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECTS_VALUE,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

//Прячем слайдер
hideSlider();

sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };

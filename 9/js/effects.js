import { imageUploadPreview } from './scale.js';

//Массив фильтров
const EFFECTS_FILTER = [
  { // «Оригинал»
    name: 'none', //Эффект наложения //или original
    style: 'none', //Функция фильтрации в свойства style
    min: 0, //min значение
    max: 100, //max значение
    step: 1, //щаг
    unit: '', //единица измерения
  },
  { // «Хром» — filter: grayscale(0..1) с шагом 0.1
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  { //«Сепия» — filter: sepia(0..1) с шагом 0.1
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  { // «Марвин» — filter: invert(0..100%) с шагом 1%
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  { //«Фобос» — filter: blur(0..3px) с шагом 0.1px
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  { //«Зной» — filter: brightness(1..3) с шагом 0.1
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];
const DEFAULT_EFFECTS_VALUE = 100;
const DEFAULT_EFFECT = EFFECTS_FILTER[0];

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsElement = document.querySelector('.effects');
const effectLevelElement = document.querySelector('.effect-level__value');

let currentEffect = DEFAULT_EFFECT;

//Функция-проверка на эффект по умолчанию
const isDeffaultEffect = () => currentEffect === DEFAULT_EFFECT;

//Функция по скрытию слайдера
const hideSlider = () => sliderContainer.classList.add('hidden');

//Функция по показу слайдера
const showSlider = () => sliderContainer.classList.remove('hidden');

//Функция по обновлению слайдера
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

  //isDeffaultEffect() ? hideSlider() : showSlider(); // не работает
};

//Обработчик эффектов
const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS_FILTER.find((effect) => effect.name === evt.target.value);
  imageUploadPreview.className = `effects__preview--${currentEffect.name}`;
  updateSlider();
};

effectsElement.addEventListener('change', onEffectsChange);

//Обработчик слайдера
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

sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };

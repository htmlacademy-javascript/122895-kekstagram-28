const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleButtonSmallerElement = document.querySelector('.scale__control--smaller');
const scaleButtonBiggerElement = document.querySelector('.scale__control--bigger');
const scaleInputValueElement = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

// Функция добавление и отрисовки значения в поле с %
const scaleImage = (value) => {
  imageUploadPreview.style.transform = `scale(${value / 100})`; // Значение от 0-1
  scaleInputValueElement.value = `${value}%`; //Добавляем символ % в поле формы
};

//Функция Кнопки уменьшения
const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputValueElement.value, 10);
  let newValue = currentValue - SCALE_STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};
//Функция Кнопки увеличения
const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputValueElement.value, 10);
  let newValue = currentValue + SCALE_STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

//Функция по сбросу значения шкалы
const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleButtonSmallerElement.addEventListener('click', onSmallerButtonClick);
scaleButtonBiggerElement.addEventListener('click', onBiggerButtonClick);

export { resetScale, imageUploadPreview };

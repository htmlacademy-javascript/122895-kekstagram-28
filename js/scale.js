const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const TRANSFORM_VALUE = 100;

const scaleButtonSmallerElement = document.querySelector('.scale__control--smaller');
const scaleButtonBiggerElement = document.querySelector('.scale__control--bigger');
const scaleInputValueElement = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageUploadPreview.style.transform = `scale(${value / TRANSFORM_VALUE})`;
  scaleInputValueElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputValueElement.value, 10);
  let newValue = currentValue - STEP_SCALE;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputValueElement.value, 10);
  let newValue = currentValue + STEP_SCALE;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleButtonSmallerElement.addEventListener('click', onSmallerButtonClick);
scaleButtonBiggerElement.addEventListener('click', onBiggerButtonClick);

export { resetScale, imageUploadPreview };

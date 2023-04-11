import { pristineReset } from './validate.js';
import { resetEffects } from './effects.js';
import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';

// Перечисление вариантов надписи для кнопки отправки формы
const SubmitButtonText = {
  IDLE: 'Отправить',
  SENDING: 'Отправляю...'
};

const inputUploadFile = document.querySelector('#upload-file');
const updateForm = document.querySelector('.img-upload__form');
const overlayForm = updateForm.querySelector('.img-upload__overlay');
const overlayCloseButtonForm = updateForm.querySelector('#upload-cancel');
const submitButton = updateForm.querySelector('.img-upload__submit');

const hashtagField = updateForm.querySelector('.text__hashtags');
const commentField = updateForm.querySelector('.text__description');

// Функция удаления обработчика Esc при фокусе на окне хэштега
const deleteEscHashtagField = () => {
  hashtagField.addEventListener('focus', () => document.removeEventListener('keydown', onFormEscKeydown));
  hashtagField.addEventListener('blur', () => document.addEventListener('keydown', onFormEscKeydown));
};

// Функция удаления обработчика Esc при фокусе на окне комментариев
const deleteEscCommentField = () => {
  commentField.addEventListener('focus', () => document.removeEventListener('keydown', onFormEscKeydown));
  commentField.addEventListener('blur', () => document.addEventListener('keydown', onFormEscKeydown));
};

// Функция открытия окна при нажатии фото
const onOpenFormChange = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);

  deleteEscHashtagField();
  deleteEscCommentField();
};

inputUploadFile.addEventListener('change', onOpenFormChange);

// Функция блокировки кнопки "Опубликовать" перед отправкой запроса на сервер
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

// Функция разблокировки кнопки "Опубликовать" после получения ответа
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Функция закрытия фото
const oncloseFormClick = () => {
  resetScale(); //сбрасываем масштаб
  resetEffects(); //сбрасываем эффекты
  pristineReset(); //сбрасываем pristine
  updateForm.reset(); //сбрасываем данные формы

  overlayForm.classList.add('hidden'); //скрываем форму
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onFormEscKeydown);
};

overlayCloseButtonForm.addEventListener('click', oncloseFormClick);

// Функция закрытия модального окна
function onFormEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    oncloseFormClick();
  }
}

export {
  onOpenFormChange,
  oncloseFormClick,
  blockSubmitButton,
  unblockSubmitButton,
  onFormEscKeydown,
  inputUploadFile
};

import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const inputUploadFile = document.querySelector('#upload-file');
const overlayForm = document.querySelector('.img-upload__overlay');
const overlayCloseButtonForm = document.querySelector('#upload-cancel');
const updateForm = document.querySelector('.img-upload__form');

const hashtagField = updateForm.querySelector('.text__hashtags');
const commentField = updateForm.querySelector('.text__description');

//Функция удаления обработчика Esc при фокусе на окне хэштега
const deleteEscKeydownForHashField = () => {
  hashtagField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });
  hashtagField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

//Функция удаления обработчика Esc при фокусе на окне комментариев
const deleteEscKeydownForTextField = () => {
  commentField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });
  commentField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

//Функция открытия окна при нажатии фото
const openFormOverlay = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);

  deleteEscKeydownForHashField();
  deleteEscKeydownForTextField();
};

inputUploadFile.addEventListener('change', openFormOverlay);

//Функция закрытия фото
const closeFormOverlay = () => {
  updateForm.reset(); //сбрасываем данные формы
  resetScale(); //сбрасываем масштаб
  resetEffects(); //сбрасываем эффекты
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
};

overlayCloseButtonForm.addEventListener('click', closeFormOverlay);

// Закрываем модалку-редактор по кнопке
function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFormOverlay();
  }
}

export { updateForm, hashtagField, commentField };

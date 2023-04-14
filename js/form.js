import { resetPristine } from './validate.js';
import { resetEffects } from './effects.js';
import { isEscapeKey } from './util.js';
import { resetScale } from './scale.js';

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

const deleteEscHashtagField = () => {
  hashtagField.addEventListener('focus', () => document.removeEventListener('keydown', onFormEscKeydown));
  hashtagField.addEventListener('blur', () => document.addEventListener('keydown', onFormEscKeydown));
};

const deleteEscCommentField = () => {
  commentField.addEventListener('focus', () => document.removeEventListener('keydown', onFormEscKeydown));
  commentField.addEventListener('blur', () => document.addEventListener('keydown', onFormEscKeydown));
};

const onOpenFormChange = () => {
  overlayForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
  deleteEscHashtagField();
  deleteEscCommentField();
};

inputUploadFile.addEventListener('change', onOpenFormChange);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const oncloseFormClick = () => {
  resetScale();
  resetEffects();
  resetPristine();
  updateForm.reset();
  overlayForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
};

overlayCloseButtonForm.addEventListener('click', oncloseFormClick);

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

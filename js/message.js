import { onFormEscKeydown } from './form.js';
import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error');
const successMessageTemplate = document.querySelector('#success');

const onCloseMessageClick = () => {
  const message = document.querySelector('.message');
  if (message) {
    message.remove();
  }
  if (message.classList.contains('error')) {
    document.addEventListener('keydown', onFormEscKeydown);
  }
  document.removeEventListener('click', onArbitraryAreaClick);
  document.removeEventListener('keydown', onModalEscKeydown);
};

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', successMessage);

  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', onCloseMessageClick);

  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onArbitraryAreaClick);
};

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', errorMessage);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onCloseMessageClick);

  document.removeEventListener('keydown', onFormEscKeydown);
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onArbitraryAreaClick);
};

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseMessageClick();
  }
}

function onArbitraryAreaClick(evt) {
  if (!(evt.target.closest('.message__inner'))) {
    onCloseMessageClick();
  }
}

export { showSuccessMessage, showErrorMessage, onCloseMessageClick };

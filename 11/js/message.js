import { onFormEscKeydown } from './form.js'; //Функция закрытия модального окна
import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error');
const successMessageTemplate = document.querySelector('#success');

//Функция для определения типа сообщения, которое необходимо закрыть
const getMessages = () => {
  const error = document.querySelector('.error');
  const success = document.querySelector('.success');
  return { error, success };
};

//Функция закрытия сообщения
const closeMessage = () => {
  const message = document.querySelector('.message');
  if (message) {
    message.remove();
  }
  if (message.classList.contains('error')) {
    document.addEventListener('keydown', onFormEscKeydown);
  }

  document.removeEventListener('click', onClickArbitraryArea);
  document.removeEventListener('keydown', onModalEscKeydown);
};

//Функция закрытия модального окна
function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

//Функция закрытия модального окна сообщения
function onClickArbitraryArea(evt) {
  if (!(evt.target.closest('.message__inner'))) {
    closeMessage();
  }
}

//Функция отображения сообщения об успешном выполнении
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.innerHTML; //Меняем содержимое новым
  document.body.insertAdjacentHTML('beforeend', successMessage); //Добавляем сообщение перед body
  const successButton = document.querySelector('.success__button');

  successButton.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onClickArbitraryArea);
};

//Функция отображения сообщения об ошибке
const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', errorMessage);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', closeMessage);
  document.removeEventListener('keydown', onFormEscKeydown);
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onClickArbitraryArea);
};

export {
  getMessages,
  showSuccessMessage,
  showErrorMessage,
  closeMessage
};

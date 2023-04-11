import { onFormEscKeydown } from './form.js'; //Функция закрытия модального окна
import { isEscapeKey } from './util.js';

const errorMessageTemplate = document.querySelector('#error');
const successMessageTemplate = document.querySelector('#success');

// Функция закрытия сообщения
const onCloseMessageClick = () => {
  const message = document.querySelector('.message');
  if (message) { //Если нашли message, удаляем
    message.remove();
  }
  if (message.classList.contains('error')) {
    document.addEventListener('keydown', onFormEscKeydown);
  }

  document.removeEventListener('click', onArbitraryAreaClick);
  document.removeEventListener('keydown', onModalEscKeydown);
};

// Функция отображения сообщения об успешном выполнении
const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.innerHTML; //Меняем содержимое новым
  document.body.insertAdjacentHTML('beforeend', successMessage); //Добавляем сообщение перед body

  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', onCloseMessageClick);

  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onArbitraryAreaClick);
};

// Функция отображения сообщения об ошибке
const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', errorMessage); //добавляет содержимое переменной errorMessage в конец элемента <body>

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onCloseMessageClick);

  document.removeEventListener('keydown', onFormEscKeydown); // Убираем обработчик с формы, чтобы не закрыть полностью всЁ
  document.addEventListener('keydown', onModalEscKeydown);
  document.addEventListener('click', onArbitraryAreaClick);
};

// Функция закрытия модального окна
function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseMessageClick();
  }
}

// Функция закрытия модального окна при клике на совбодное пространство
function onArbitraryAreaClick(evt) {
  if (!(evt.target.closest('.message__inner'))) {
    onCloseMessageClick();
  }
}

export {
  showSuccessMessage,
  showErrorMessage,
  onCloseMessageClick
};

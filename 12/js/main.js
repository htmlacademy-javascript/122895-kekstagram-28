import { showErorMesage, debounce } from './util.js'; //Функция выводит окно при ошибке //Функция для устранения дребезга
import { setUserFormSubmit } from './validate.js'; //Функция валидации формы при отправке
import { closeFormOverlay } from './form.js'; //Функция закрытия фото
import { renderGallery } from './modal.js'; //Функция добавления вспомогательной информации к фотографиям
import { getData } from './load.js'; //Функция получения ответа от сервера
import './avatar.js';

//const RERENDER_DELAY = 500; // Время задержки перед повторной отправкой

try {
  const dataPictures = await getData();
  debounce(renderGallery(dataPictures));
} catch (err) {
  showErorMesage(err.message);
}

//Закрытие формы при отправке
setUserFormSubmit(closeFormOverlay);

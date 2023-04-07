import { setUserFormSubmit } from './validate.js'; //Функция валидации формы при отправке
import { closeFormOverlay } from './form.js'; //Функция закрытия фото
import { showErorMesage } from './util.js'; //Функция показывает окно при ошибке во время отправки фото
import { renderGallery } from './modal.js'; //Функция добавления вспомогательной информации к фотографиям
import { getData } from './load.js'; //Функция получения ответа от сервера

getData()
  .then((dataPictures) => {
    renderGallery(dataPictures);
  })
  .catch((err) => {
    showErorMesage(err.message);
  });

setUserFormSubmit(closeFormOverlay);


import { isEscapeKey } from './util.js';
import { createTemplateList, clearTemplateList } from './thumbnail.js';

const bigPictureElement = document.querySelector('.big-picture');
const containerBody = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const thumbnailModalClose = bigPictureElement.querySelector('.big-picture__cancel');

// Функция закрытия окна при нажатии на Esc
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeThumbnailModal();
  }
};

// Функция открытия окна при нажатии фото
const openThumbnailModal = () => {
  bigPictureElement.classList.remove('hidden');
  containerBody.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
};

const fillData = (pictire) => {
  bigPictureElement.querySelector('.big-picture__img img').src = pictire.url;
  openThumbnailModal();
};

// Функция очистки обрабочтика
function closeThumbnailModal() {
  bigPictureElement.classList.add('hidden');
  clearTemplateList();

  document.removeEventListener('keydown', onModalEscKeydown);
}

const renderGallery = (pictures) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === Number(thumbnail.dataset.thumbnailId)
    );

    fillData(picture);
  });

  //Обработчик закрытия модального окна
  thumbnailModalClose.addEventListener('click', () => {
    closeThumbnailModal();
  });

  createTemplateList(pictures);
};

export { renderGallery };


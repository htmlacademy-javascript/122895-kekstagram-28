import { isEscapeKey } from './util.js';
import { createTemplateList } from './thumbnail.js';

const bigPictureElement = document.querySelector('.big-picture'); // секция для отображения фотографий
const containerBody = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const thumbnailModalClose = bigPictureElement.querySelector('.big-picture__cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const socialComments = bigPictureElement.querySelector('.social__comments'); // Список коментариев

const templateCommentFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция отрисовки комментариев в модальном окне фотографии
const createTemplateCommentList = (dataPictures) => {
  const listFragment = document.createDocumentFragment();

  dataPictures.forEach(({ comments }) => {
    const templateElement = templateCommentFragment.cloneNode(true);
    templateElement.querySelector('.social__picture').src = comments.avatar;
    templateElement.querySelector('.social__picture').alt = comments.name;
    templateElement.querySelector('.social__text').textContent = comments.message;
    listFragment.append(templateElement);
  });

  socialComments.append(listFragment);
};

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
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  containerBody.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

// Функция отрисовки фотографий в модальном окне
const fillData = ({ url, description, likes, comments }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  openThumbnailModal();
};

// Функция очистки обрабочтика
function closeThumbnailModal() {
  bigPictureElement.classList.add('hidden');
  containerBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
}

const renderGallery = (pictures) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    // Поиск объекта по которому произошел клик
    const picture = pictures.find(
      (item) => item.id === Number(thumbnail.dataset.thumbnailId)
    );

    fillData(picture);
    createTemplateCommentList(picture);
  });

  //Обработчик закрытия модального окна
  thumbnailModalClose.addEventListener('click', () => {
    closeThumbnailModal();
  });

  createTemplateList(pictures);
};

export { renderGallery };

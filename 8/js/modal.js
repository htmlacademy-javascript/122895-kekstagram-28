import { isEscapeKey } from './util.js';
import { createTemplateList, picturesContainer } from './thumbnail.js';

const COMMENTS_PORTION = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPicturePreview = document.querySelector('.big-picture__preview');
const bigPictureClose = bigPicturePreview.querySelector('.big-picture__cancel');

const commentList = bigPicturePreview.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment');
const commentCount = bigPicturePreview.querySelector('.social__comment-count');
const commentsLoader = bigPicturePreview.querySelector('.comments-loader');

let commentsShown = 0; //количество показанных комментариев
let commentsArray = []; //список коммнтариев

// Функция закрытия окна при нажатии на Esc
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeThumbnailModal();
  }
};

// Функция отрисовки комментариев в модальном окне
const drawingComment = (({ avatar, name, message }) => {
  const comment = commentItem.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

// Функция отрисовки фотографий и комментариев в модальном окне
const drawingPhotos = ({ url, description, likes, comments }) => {
  bigPicturePreview.querySelector('.big-picture__img img').src = url;
  bigPicturePreview.querySelector('.big-picture__img img').alt = description;
  bigPicturePreview.querySelector('.likes-count').textContent = likes;
  bigPicturePreview.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(drawingComment(comment));
  });
  commentList.innerHTML = '';
  commentList.append(fragment);

  openThumbnailModal({ comments });
};

// Функция добавления вспомогательной информации к фотографиям
const renderGallery = (pictures) => {
  picturesContainer.addEventListener('click', (evt) => {
    //ищем дата-атрибуты
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    // если их нет, то завершаем выполнение
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    // иначе, ведем поиск по объекту по которому произошел клик
    const picture = pictures.find(
      (item) => item.id === Number(thumbnail.dataset.thumbnailId)
    );

    drawingPhotos(picture);
  });

  //Обработчик закрытия модального окна
  bigPictureClose.addEventListener('click', () => {
    closeThumbnailModal();
  });

  createTemplateList(pictures);
};

// Функция отрисовки необходимого количества комментариев
const renderComments = () => {
  commentsShown += COMMENTS_PORTION;
  // если комментариев в массве больше нет
  if (commentsShown >= commentsArray.length) {
    commentsLoader.classList.add('hidden');
    // полное количество комментариев
    commentsShown = commentsArray.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = drawingComment(commentsArray[i]);
    commentsFragment.append(commentElement);
  }
  commentList.innerHTML = '';
  commentList.append(commentsFragment);
  commentCount.innerHTML = `${commentsShown} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
};

// Функция открытия окна при нажатии фото
function openThumbnailModal(element) {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  commentsArray = element.comments;
  commentsShown = 0;
  renderComments();

  document.addEventListener('keydown', onModalEscKeydown);
}

// Функция очистки обрабочтика
function closeThumbnailModal() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  commentsShown = 0;
}

commentsLoader.addEventListener('click', renderComments);
renderComments();

export { renderGallery };



import { createTemplateList } from './thumbnail.js';
import { isEscapeKey } from './util.js';

const COMMENTS_PORTION = 5;

const picturesContainer = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigPicturePreview = document.querySelector('.big-picture__preview');
const bigPictureClose = bigPicturePreview.querySelector('.big-picture__cancel');
const commentList = bigPicturePreview.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment');
const commentCount = bigPicturePreview.querySelector('.social__comment-count');
const commentsLoader = bigPicturePreview.querySelector('.comments-loader');

let commentsShown = 0;
let commentsArray = [];

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onModalClose();
  }
};

const drawingComment = (({ avatar, name, message }) => {
  const comment = commentItem.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
});

const onRenderCommentsClick = () => {
  commentsShown += COMMENTS_PORTION;
  if (commentsShown >= commentsArray.length) {
    commentsLoader.classList.add('hidden');
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

const drawingBigPhoto = ({ url, description, likes, comments }) => {
  bigPicturePreview.querySelector('.big-picture__img img').src = url;
  bigPicturePreview.querySelector('.big-picture__img img').alt = description;
  bigPicturePreview.querySelector('.likes-count').textContent = likes;
  bigPicturePreview.querySelector('.comments-count').textContent = comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  commentsArray = comments;
  if (comments.length > 0) {
    onRenderCommentsClick();
  } else {
    commentList.innerHTML = '';
    commentCount.innerHTML = 'Нет <span class="comments-count"></span> комментариев';
    commentsLoader.classList.add('hidden');
  }
  onModalOpen();
};

const renderGallery = (pictures) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();
    const picture = pictures.find((item) => item.id === Number(thumbnail.dataset.thumbnailId));
    drawingBigPhoto(picture);
  });
  bigPictureClose.addEventListener('click', () => onModalClose());
  createTemplateList(pictures);
};

function onModalOpen() {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
}

function onModalClose() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  commentsShown = 0;
}

commentsLoader.addEventListener('click', onRenderCommentsClick);

export { renderGallery };

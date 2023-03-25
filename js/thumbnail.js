import { getPhotos } from './setup.js';

export const createPhoto = () => {
  // Контейнер для фото
  const imageContainerElement = document.querySelector('.pictures'); // секция для отображения фотографий
  const templateFragment = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  const createPhotos = getPhotos(); //массив генерируемых фотографий
  const fragment = document.createDocumentFragment();

  createPhotos.forEach(({ url, likes, comments }) => {
    const photoElement = templateFragment.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(photoElement);
  });

  return imageContainerElement.append(fragment);
};

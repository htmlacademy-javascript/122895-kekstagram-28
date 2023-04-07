const picturesContainer = document.querySelector('.pictures');
const templateFragment = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция отрисовки фотографий в галлереи
const createTemplateList = (dataPictures) => {
  const listFragment = document.createDocumentFragment();

  dataPictures.forEach(({ url, description, likes, comments, id }) => {
    const templateElement = templateFragment.cloneNode(true);

    templateElement.querySelector('.picture__img').src = url;
    templateElement.querySelector('.picture__img').alt = description;
    templateElement.querySelector('.picture__likes').textContent = likes;
    templateElement.querySelector('.picture__comments').textContent = comments.length;
    templateElement.dataset.thumbnailId = id;

    listFragment.append(templateElement);
  });

  picturesContainer.append(listFragment);
  picturesContainer.classList.remove('hidden');
};

export { createTemplateList };

const templateFragment = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailContainer = document.querySelector('.pictures');

const redrawingThumbnail = () => {
  const thumbnailAllinContainer = thumbnailContainer.querySelectorAll('.picture');
  thumbnailAllinContainer.forEach((element) => element.remove());
};

const createThumbnail = (({ url, description, likes, comments, id }) => {
  const template = templateFragment.cloneNode(true);
  template.querySelector('.picture__img').src = url;
  template.querySelector('.picture__img').alt = description;
  template.querySelector('.picture__likes').textContent = likes;
  template.querySelector('.picture__comments').textContent = comments.length;
  template.dataset.thumbnailId = id;
  return template;
});

const renderThumbnail = (dataThumbnail) => {
  const listFragment = document.createDocumentFragment();
  dataThumbnail.forEach((element) => listFragment.append(element));
  thumbnailContainer.append(listFragment);
  thumbnailContainer.classList.remove('hidden');
};

const createTemplateList = (dataThumbnail) => {
  redrawingThumbnail();
  const templateElements = dataThumbnail.map((picture) => createThumbnail(picture));
  renderThumbnail(templateElements);
};

export { createTemplateList };

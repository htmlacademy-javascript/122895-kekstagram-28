const PICTURE_RANDOM_COUNT = 10;
const UPDATE_FREQUENCY = 0.5;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');
const filtersForm = filterElement.querySelector('.img-filters__form');
const filterFormButtons = filtersForm.querySelectorAll('.img-filters__button');

let currentFilter = Filters.DEFAULT;
let picturesArray = [];

const getsortPicturesRandom = () => Math.random() - UPDATE_FREQUENCY;

const sortComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const filterFunctions = {
  [Filters.DEFAULT]: () => [...picturesArray],
  [Filters.RANDOM]: () => [...picturesArray].sort(getsortPicturesRandom).slice(0, PICTURE_RANDOM_COUNT),
  [Filters.DISCUSSED]: () => [...picturesArray].sort(sortComments)
};

const getFilterPictures = () => filterFunctions[currentFilter](picturesArray);

const setFilterPictures = (callback) => {
  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button--active')) {
      return;
    }
    filterFormButtons.forEach((item) => {
      if (item !== evt.target) {
        item.classList.remove('img-filters__button--active');
      }
    });
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    callback(getFilterPictures());
  });
};

const activatingFilters = (dataPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  picturesArray = [...dataPictures];
  setFilterPictures(callback);
};

export { getFilterPictures, activatingFilters };

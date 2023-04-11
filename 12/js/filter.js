const PICTURE_RANDOM_COUNT = 10; // Количество случайных фотографий
const UPDATE_FREQUENCY = 0.5; // Частота обновления при сортировке

//Перечисление Фильтров
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

// Функция для обновления рандомного списка фотографий
const sortPicturesRandom = () => Math.random() - UPDATE_FREQUENCY;

// Функция сортировки в порядке УБЫВАНИЯ количества комментариев
const sortComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

// Объект Фильтр: функция фильтрации
const filterFunctions = {
  [Filters.DEFAULT]: () => [...picturesArray],
  [Filters.RANDOM]: () => [...picturesArray].sort(sortPicturesRandom).slice(0, PICTURE_RANDOM_COUNT),
  [Filters.DISCUSSED]: () => [...picturesArray].sort(sortComments)
};
// Функция вызова сортировки для тукущего значения фильтра
const getFilterPictures = () => filterFunctions[currentFilter](picturesArray);

// Функция добавляет обработчик клика на кнопки фильтра и при клике на кнопку изменяет текущий фильтр на выбранный
const setFilterPictures = (callback) => {
  filtersForm.addEventListener('click', (evt) => {
    filterFormButtons.forEach((item) => {
      item.classList.remove('img-filters__button--active'); //удаляет класс  у всех кнопок фильтра
    });

    evt.target.classList.add('img-filters__button--active'); // доюавляет класс выбранной кнопке

    currentFilter = evt.target.id;
    callback(getFilterPictures()); //вызывает переданную ей функцию обратного вызова с отфильтрованным массивом фотографий в качестве аргумента
  });
};

// Функция для активации фильтров
const activatingFilters = (dataictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  picturesArray = [...dataictures];
  setFilterPictures(callback);
};

export { getFilterPictures, activatingFilters };

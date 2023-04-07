//Получение уникальных ID в заданном диапазоне
const getGeneraRandomId = (min, max) => {
  /*
    Math.ceil   - Возвращает наименьшее целое число, большее или равное его числовому аргументу.
    Math.min    - Возвращает меньшее из набора предоставленных числовых выражений.
    Math.max    - Возвращает большее из набора предоставленных числовых выражений.
    Math.abs    - Возвращает абсолютное значение числа.
    Math.random - Возвращает случайное число от 0 (вкл) до 1 (не вкл).
    Math.floor  - Округляет до ближайшего меньшего.
  */
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Поиск случайного элемента в переданном массиве. (декомпозиция)
const getRandomArrayElement = (array) => array[getGeneraRandomId(0, array.length - 1)];

// Получение уникального последовательного значения "номер комментария" (замыкание)
const getRandomId = () => {
  let lastGaneratedId = 0;
  return () => {
    lastGaneratedId += 1;
    return lastGaneratedId;
  };
};

const createIdComments = getRandomId();

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getGeneraRandomId,
  getRandomArrayElement,
  createIdComments,
  isEscapeKey
};

//Время задержки
const ALERT_SHOW_TIME = 3000;

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

//Функция для проверки клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция показывает окно при ошибке во время отправки фото
const showErorMesage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getGeneraRandomId,
  getRandomArrayElement,
  createIdComments,
  isEscapeKey,
  showErorMesage
};

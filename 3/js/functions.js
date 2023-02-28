/*
1 Функция для проверки длины строки.
//Она нам пригодится для валидации формы.
*/
const checkingLengthstring = (checkedString, evaluationСriteria) => checkedString.length <= evaluationСriteria;

checkingLengthstring('проверяемая строка', 20); // Результат: true - строка проходит по длине
checkingLengthstring('проверяемая строка', 18); // Результат: true - строка проходит по длине
checkingLengthstring('проверяемая строка', 10); // Результат: false — строка не проходит

/*
2 Функция для проверки, является ли строка палиндромом.
*/
const checkingPalidrome = function (palidrome) {
  const withoutSpaces = palidrome
    .replaceAll(' ', '')
    .toLowerCase();
  const reversePalidrome = withoutSpaces
    .split('')
    .reverse()
    .join('');
  return withoutSpaces === reversePalidrome;
};

checkingPalidrome('топот'); // Результат: true - строка является палиндромом
checkingPalidrome('ДовОд'); // Результат: true - несмотря на разный регистр, тоже палиндром
checkingPalidrome('Кекс'); // Результат: false - это не палиндром
checkingPalidrome('Лёша на полке клопа нашёл '); // Результат: true - это палиндром

/*
3 Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.
*/
const extractingNumbers = function (stringName) {
  stringName = parseInt(String(stringName).replace(/[^\d]/g, ''), 10);
  /*
    ^ - от начала строки
   /d - любые числа в диапазонt от 0-9
    g - искать все совпадения данного выражения в строке вместо того, чтобы возвращать только первый
   '' - убрать пробелы
  */
  return stringName;
};

extractingNumbers('2023 год'); // Результат: число 2023
extractingNumbers('ECMAScript 2022'); // Результат: число 2022
extractingNumbers('1 кефир, 0.5 батона'); // Результат: число 105
extractingNumbers('а я томат'); // Результат: NaN

/*
4 Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
— и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
//Эта функция нам пригодится для формирования адресов файлов.
*/
const addCharacters = function (sourceString, minLenght, сharacters) {
  while (sourceString.length < minLenght) {
    if (сharacters.length <= minLenght - sourceString.length) {
      sourceString = сharacters + sourceString;
    } else {
      sourceString = сharacters.slice(0, minLenght - sourceString.length) + sourceString;
    }
  }
  return sourceString;
};

addCharacters('1', 2, '0'); // Результат: строка '01'
addCharacters('1', 4, '0'); // Результат: строка '0001'
addCharacters('q', 4, 'werty'); // Результат: строка 'werq'
addCharacters('q', 4, 'we'); // Результат: строка 'wweq'
addCharacters('qwerty', 4, '0'); // Результат: строка 'qwerty'

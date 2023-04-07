/*
1 Функция для проверки длины строки.
//Она нам пригодится для валидации формы.
*/
const isscheckingLengthstring = (checkedString, evaluationСriteria) => checkedString.length <= evaluationСriteria;

isscheckingLengthstring('проверяемая строка', 20); // Результат: true - строка проходит по длине
isscheckingLengthstring('проверяемая строка', 18); // Результат: true - строка проходит по длине
isscheckingLengthstring('проверяемая строка', 10); // Результат: false — строка не проходит

/*
2 Функция для проверки, является ли строка палиндромом.
*/
const ischeckingPalidrome = (palidrome) => {
  const withoutSpaces = palidrome
    .replaceAll(' ', '')
    .toLowerCase();
  return withoutSpaces === withoutSpaces
    .split('')
    .reverse()
    .join('');
  /*
    //перевернули строку
    let reversePalidrome = '';
    for (let i = withoutSpaces.length - 1; i >= 0; i--) {
      reversePalidrome += withoutSpaces.at(i);
    }
  */
};

ischeckingPalidrome('топот'); // Результат: true - строка является палиндромом
ischeckingPalidrome('ДовОд'); // Результат: true -  тоже палиндром
ischeckingPalidrome('Кекс'); // Результат: false - это не палиндром
ischeckingPalidrome('Лёша на полке клопа нашёл '); // Результат: true - это палиндром

/*
3 Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN.
*/
const extractingNumbers = (stringName) => {
  /* #1
  //stringName = parseInt(String(stringName).replace(/[^\d]/g, ''), 10);
  */
  /*
    ^ - от начала строки
   /d - любые числа в диапазонt от 0-9
    g - искать все совпадения данного выражения в строке вместо того, чтобы возвращать только первый
   '' - убрать пробелы
  */
  /*
    return stringName;
  */

  // #2
  let result = '';
  if (typeof stringName === 'number') {
    return stringName;
  }
  for (let i = 0; i < stringName.length; i++) {
    if (!Number.isNaN(parseInt(stringName.at(i), 10))) {
      result += stringName.at(i);
    }
  }
  return parseInt(result, 10);
};

extractingNumbers('2023 год'); // Результат: число 2023
extractingNumbers('ECMAScript 2022'); // Результат: число 2022
extractingNumbers('1 кефир, 0.5 батона'); // Результат: число 105
extractingNumbers('а я томат'); // Результат: NaN

/* #1
4 Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
— и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца.
//Эта функция нам пригодится для формирования адресов файлов.
*/
const addCharacters = (sourceString, minLenght, сharacters) => {
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

/* #2
const addCharacters = (sourceString, minLenght, сharacters) => {
  const actualPad = (minLenght - sourceString.length);
  return (actualPad <= 0)
  ? sourceString
  : сharacters.slice(0, actualPad % сharacters.length) + сharacters.repeat(actualPad / сharacters.length) + sourceString;
}
*/
/* #3
const addCharacters = (sourceString, minLenght, сharacters) => {
  return sourceString.padStart(minLenght, сharacters);
}
*/

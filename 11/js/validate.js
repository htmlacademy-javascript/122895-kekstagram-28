
import { sendData } from './load.js';
import { blockSubmitButton, unblockSubmitButton } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_LENGTH_HASHTAG = 'Не более 5 Хэштегов';
const ERROR_DUPLICATE_HASHTAG = 'Хэштеги не должны повторяться';
const ERROR_INVALID_HASHTAG = 'Хэштеги должны начинаться с #, содержать символы и/или цифры и не более 20 символов';
const ERROR_MAX_LENGTH_COMMENTS = 'Максимальная длина комментария 140 символов';

const MAX_COUNT_HASTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const updateForm = document.querySelector('.img-upload__form');
const hashtagField = updateForm.querySelector('.text__hashtags');
const commentField = updateForm.querySelector('.text__description');

//Функция подготовки Хэштегов к валидации
const prepareTags = (value) => value.trim().split(' ');

//Функция по валидации требований к хэштегу в соответствии регулярному выражению
const isValidTags = (tags) => prepareTags(tags).every((tag) => HASHTAG_PATTERN.test(tag));

//Функция по валидации количества хэштегов
const validateTagsLength = (tags) => prepareTags(tags).length <= MAX_COUNT_HASTAGS;

//Функция по валидации уникальности хэштегов
const validateUniqueTags = (tags) => {
  const lowerCaseTags = prepareTags(tags).map((tag) => tag.toLowerCase());
  return new Set(lowerCaseTags).size === lowerCaseTags.length;
};

//Функция по валидации длины комментариев
const validateCommentsField = (value) => value.length <= MAX_COMMENTS_LENGTH;

//Создание экземплятор валидатора и передача в него элемента формы
const pristine = new Pristine(updateForm, {
  classTo: 'img-upload__field-wrapper', // Элемент на который будут добавляется служебные классы
  errorTextParent: 'img-upload__field-wrapper', // Класс для элемента в котором будет вывод ошибки
  errorTextClass: 'img-upload__field-wrapper__error', // текст ошибки
});

//Функция по сбросу pristine
const pristineReset = () => pristine.reset();

//Описание валидации хэштегов №1
pristine.addValidator(
  hashtagField, // Элемент валидации
  isValidTags, //функция проверки
  ERROR_INVALID_HASHTAG //Сообщение об ошибке
);

//Описание валидации хэштегов №2
pristine.addValidator(
  hashtagField,
  validateTagsLength,
  ERROR_LENGTH_HASHTAG
);

//Описание валидации хэштегов №3
pristine.addValidator(
  hashtagField,
  validateUniqueTags,
  ERROR_DUPLICATE_HASHTAG
);

//Описание валидации комментариев
pristine.addValidator(
  commentField,
  validateCommentsField,
  ERROR_MAX_LENGTH_COMMENTS
);

//Функция валидации формы при отправке
const setUserFormSubmit = (onSuccess) => {
  updateForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();

      try { //блок обработки ошибок
        const formData = new FormData(evt.target);
        await sendData(formData);
        onSuccess();
        showSuccessMessage();
      } catch (err) {
        showErrorMessage(err.message);
      } finally {
        unblockSubmitButton();
      }
    }
  });
};

export { pristineReset, setUserFormSubmit };

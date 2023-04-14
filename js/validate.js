import { blockSubmitButton, unblockSubmitButton } from './form.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './load.js';

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

const ERROR_LENGTH_HASHTAG = 'Не более 5 Хэштегов';
const ERROR_DUPLICATE_HASHTAG = 'Хэштеги не должны повторяться';
const ERROR_INVALID_HASHTAG = 'Хэштеги должны начинаться с #, содержать символы и/или цифры не более 20 символов';
const ERROR_MAX_LENGTH_COMMENTS = 'Максимальная длина комментария 140 символов';

const MAX_COUNT_HASTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const updateForm = document.querySelector('.img-upload__form');
const hashtagField = updateForm.querySelector('.text__hashtags');
const commentField = updateForm.querySelector('.text__description');

const prepareTags = (value) => value.trim().split(' ');

const isValidTags = (tags) => {
  if (!tags) {
    return true;
  } else {
    return prepareTags(tags).every((tag) => HASHTAG_PATTERN.test(tag));
  }
};

const validateTagsLength = (tags) => prepareTags(tags).length <= MAX_COUNT_HASTAGS;

const validateUniqueTags = (tags) => {
  const lowerCaseTags = prepareTags(tags).map((tag) => tag.toLowerCase());
  return new Set(lowerCaseTags).size === lowerCaseTags.length;
};

const validateCommentsField = (value) => value.length <= MAX_COMMENTS_LENGTH;

const pristine = new Pristine(updateForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const resetPristine = () => pristine.reset();

pristine.addValidator(
  hashtagField,
  isValidTags,
  ERROR_INVALID_HASHTAG
);

pristine.addValidator(
  hashtagField,
  validateTagsLength,
  ERROR_LENGTH_HASHTAG
);

pristine.addValidator(
  hashtagField,
  validateUniqueTags,
  ERROR_DUPLICATE_HASHTAG
);

pristine.addValidator(
  commentField,
  validateCommentsField,
  ERROR_MAX_LENGTH_COMMENTS
);

const setUserFormSubmit = (onSuccess) => {
  updateForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      try {
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

export { resetPristine, setUserFormSubmit };

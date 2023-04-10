import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {isEscapeKey} from './util.js';
import {getMessageType} from './messages.js';

const MAX_HASHTAGS_COUNT = 5;
const ERROR_TEXT = 'Неправильно заполнено поле';
const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFile = uploadForm.querySelector('#upload-file');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const isValidTag = (tag) => REGEXP.test(tag);

const isValidLength = (tags) => tags.length <= MAX_HASHTAGS_COUNT;

const isValidCase = (tags) => {
  const lowerCase = tags.map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);

  return isValidLength(tags) && isValidCase(tags) && tags.every(isValidTag);
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', setOnDocumentKeydown);
};

const closeForm = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.addEventListener('keydown', setOnDocumentKeydown);
};

const isFocused = () =>
  document.activeElement === textHashtags ||
  document.activeElement === textDescription;

function setOnDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFocused() && !getMessageType()) {
    evt.preventDefault();
    closeForm();
  }
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

const setOnFormChange = () => {
  openForm();
};

const setOnCancelButtonClick = () => {
  closeForm();
};

const setOnFormSubmitClick = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

pristine.addValidator (textHashtags, validateTags, ERROR_TEXT);

const setOnFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

uploadFile.addEventListener('change', setOnFormChange);
cancelButton.addEventListener('click', setOnCancelButtonClick);
uploadForm.addEventListener('submit', setOnFormSubmitClick);

export {setOnFormSubmit, closeForm};

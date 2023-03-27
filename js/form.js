import {isEscapeKey} from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const ERROR_TEXT = 'Неправильно заполнено поле';
const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const textHashtags = uploadForm.querySelector('.text__hashtags');
const textDescription = uploadForm.querySelector('.text__description');

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

  return tags.every(isValidTag) && isValidLength(tags) && isValidCase(tags);
};

pristine.addValidator (
  textHashtags,
  validateTags,
  ERROR_TEXT
);

const openForm = () => {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  uploadForm.reset();
  pristine.reset();
  uploadForm.classList.add('hidden');
  body.classList.rempve('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const isFocused = () =>
  document.activeElement === textHashtags ||
  document.activeElement === textDescription;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

const onFormChange = () => {
  openForm();
};

const onCancelButtonClick = () => {
  closeForm();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.vaidate();
};

uploadFile.addEventListener('change', onFormChange);
cancelButton.addEventListener('click', onCancelButtonClick);
uploadForm.addEventListener('submit', onFormSubmit);

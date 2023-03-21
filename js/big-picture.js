import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social-comment');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('template#social-comment').content.querySelector('social-comment');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureAlt = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social-caption');

const createComment = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  commentsList.append(...comments.map(createComment));
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const renderPictures = ({url, likes, description}) => {
  bigPictureImg.src = url;
  bigPictureAlt.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
};

const openBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  commentsCount.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictures(data);
  renderComments(data.comments);
};

cancelButton.addEventListener('click', onCancelButtonClick);

export {openBigPicture};

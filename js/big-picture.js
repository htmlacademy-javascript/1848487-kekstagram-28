import {isEscapeKey} from './util.js';

const COMMENTS_PER_PICTURE = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const bigPictureElement = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');

let allComments = [];
let commentsOpened = 0;

const renderComments = () => {
  const limit = commentsOpened + COMMENTS_PER_PICTURE;
  if (allComments.length <= limit) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentsCount.innerHTML = `${Math.min(allComments.length, limit)} из ${allComments.length} комментариев`;

  allComments.slice(commentsOpened, limit).forEach((comment) => {
    const createComment = commentTemplate.cloneNode(true);
    createComment.querySelector('.social__picture').src = comment.avatar;
    createComment.querySelector('.social__picture').alt = comment.name;
    createComment.querySelector('.social__text').textContent = comment.message;

    commentsList.append(createComment);
  });
};

const closeBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', setOnDocumentKeydown);
};

function setOnDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

const setOnCancelButtonClick = () => {
  closeBigPicture();
};

commentsLoader.addEventListener('click', () => {
  commentsOpened += COMMENTS_PER_PICTURE;
  renderComments();
});

const openBigPicture = (url, likes, comments, description) => {
  bigPictureElement.src = url;
  bigPictureElement.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  commentsList.innerHTML = '';
  commentsOpened = 0;
  allComments = comments;

  renderComments();

  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', setOnDocumentKeydown);
};

cancelButton.addEventListener('click', setOnCancelButtonClick);

export {openBigPicture};

const COMMENTS_PER_PICTURE = 5;

const bigPicture = document.querySelector('.big-picture');
const commentsCount = document.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social-comment');
const commentsLoader = document.querySelector('.comments-loader');
const cancelButton = document.querySelector('.big-picture__cancel');

let commentsOpened = 0;
const comments = [];

const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.innerHTML = 'img class="social__picture" src="" alt="" width="35" height="35"';
  comment.classList.add('social__comment');

  comment.document.querySelector('.social__picture').src = avatar;
  comment.document.querySelector('.social__picture').alt = name;
  comment.document.querySelector('.social__text').textContent = message;

  return comments;
};

const renderComments = () => {
  commentsOpened += COMMENTS_PER_PICTURE;

  if (commentsOpened >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsOpened = comments.length;
  } else {
    comments.loader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i <= commentsOpened; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentsCount.innerHTML = `${commentsOpened}`;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsOpened = 0;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const onCancelButtonClick = () => {
  closeBigPicture();
};

const renderPictures = ({url, likes, description}) => {
  bigPicture.document.querySelector('.big-picture__img img').src = url;
  bigPicture.document.querySelector('.big-picture__img img').alt = description;
  bigPicture.document.querySelector('.blikes-count').textContent = likes;
  bigPicture.document.querySelector('.social-captio').textContent = description;
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

import {renderThumbnails} from './thumbnails.js';
import {openBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');

const renderPictures = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId
    );
    openBigPicture(picture);
  });

  renderThumbnails(pictures, container);
};

export {renderPictures};

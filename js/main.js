import {renderThumbnails} from './thumbnails.js';
import {setOnFormSubmit, closeForm} from './form.js';
import {showAlert, debounce} from './util.js';
import {getData, sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {init, getSortedPictures} from './sorting.js';
import './avatar.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData (data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const createPhotos = await getData();
  const debouncedRenderThumbnails = debounce(renderThumbnails);
  init(createPhotos, debouncedRenderThumbnails);
  renderThumbnails(getSortedPictures());
} catch (err) {
  showAlert(err.message);
}

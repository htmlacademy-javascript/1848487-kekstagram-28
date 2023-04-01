import {renderThumbnails} from './thumbnails.js';
import {setOnFormSubmit, closeForm} from './form.js';
import {showAlert} from './util.js';
import {getData, sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';

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
  renderThumbnails(createPhotos);
} catch (err) {
  showAlert(err.message);
}

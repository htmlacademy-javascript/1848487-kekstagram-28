const RANDOM_PICTURES_COUNT = 10;

const Sorting = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const sorting = document.querySelector('.img-filters');
let currentSorting = Sorting.DEFAULT;
let pictures = [];

const randomSorting = () => Math.random() - 0.5;
const discussedSorting = (a, b) => b.comments.length - a.comments.length;
const clearPictures = () => document.querySelectorAll('.picture').forEach((element) => element.remove());

const getSortedPictures = () => {
  clearPictures();
  switch(currentSorting) {
    case Sorting.DEFAULT:
      return [...pictures];
    case Sorting.RANDOM:
      return [...pictures].sort(randomSorting).slice(0, RANDOM_PICTURES_COUNT);
    case Sorting.DISCUSSED:
      return [...pictures].sort(discussedSorting);
  }
};

const onSortingClick = (callback) => {
  sorting.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    const clickedButton = evt.target;
    if (clickedButton.id === currentSorting) {
      return;
    }
    sorting.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentSorting = clickedButton.id;
    callback(getSortedPictures());
  });
};

const init = (loadedPictures, callback) => {
  sorting.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  onSortingClick(callback);
};

export {init, getSortedPictures};

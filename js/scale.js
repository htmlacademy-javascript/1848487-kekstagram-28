const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

scaleValue.value = `${DEFAULT_SCALE}%`;

const scaleImage = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const onScaleSmallerClick = () => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  let newScaleValue = currentScaleValue - SCALE_STEP;
  if (newScaleValue < MIN_SCALE) {
    newScaleValue = MIN_SCALE;
  }
  scaleImage(newScaleValue);
};

const onScaleBiggerClick = () => {
  const currentScaleValue = parseInt(scaleValue.value, 10);
  let newScaleValue = currentScaleValue + SCALE_STEP;
  if (newScaleValue > MAX_SCALE) {
    newScaleValue = MAX_SCALE;
  }
  scaleImage(newScaleValue);
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

scaleSmaller.addEventListener('click', onScaleSmallerClick);
scaleBigger.addEventListener('click', onScaleBiggerClick);

export {resetScale};

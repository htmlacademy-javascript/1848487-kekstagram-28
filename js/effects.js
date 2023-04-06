const EFFECTS = [
  {
    name: 'none',
    filter: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let effectSelected = DEFAULT_EFFECT;

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');

const isDefault = () => effectSelected === DEFAULT_EFFECT;
const showSlider = () => effectLevel.classList.remove('hidden');
const hideSlider = () => effectLevel.classList.add('hidden');

const updateSlider = () => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: effectSelected.min,
      max: effectSelected.max,
    },
    start: effectSelected.start,
    step: effectSelected.step,
  });

  (isDefault() ? hideSlider : showSlider)();
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  effectSelected = EFFECTS.find((effect) => effect.name === evt.target.value);
  imgUploadPreview.className = (`effects__preview--${effectSelected.name}`);
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = effectSlider.noUiSlider.get();
  imgUploadPreview.style.filter = isDefault()
    ? DEFAULT_EFFECT.filter
    : `${effectSelected.filter}(${sliderValue}${effectSelected.unit})`;
  effectValue.value = sliderValue;
};

const resetEffects = () => {
  effectSelected = DEFAULT_EFFECT;
  imgUploadPreview.className = (`effects__preview--${effectSelected.name}`);
  updateSlider();
};

noUiSlider.create(effectSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.start,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
hideSlider();

effectsList.addEventListener('change', onEffectsChange);
effectSlider.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};

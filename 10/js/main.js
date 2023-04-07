import { createPhotos } from './setup.js';
import { renderGallery } from './modal.js';
import './form.js';
import './validate.js';
import './scale.js';
import './effects.js';

renderGallery(createPhotos());

/*
import { closeFormOverlay } from './form';
import { setUserFormSubmit } from './validate';
import { renderGallery } from './modal.js';
import { getData } from './load.js';
import './form.js';
import './validate.js';
import './scale.js';
import './effects.js';

getData()
  .then((dataPictures) => {
    renderGallery(dataPictures.slice(0, PHOTOS_OBJECTS_COUNT));
  });

setUserFormSubmit(closeFormOverlay);
*/

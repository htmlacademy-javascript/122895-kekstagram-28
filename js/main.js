import { getFilterPictures, activatingFilters } from './filter.js';
import { showErorMesage, debounce } from './util.js';
import { createTemplateList } from './thumbnail.js';
import { setUserFormSubmit } from './validate.js';
import { oncloseFormClick } from './form.js';
import { renderGallery } from './modal.js';

import { getData } from './load.js';
import './avatar.js';

const RERENDER_DELAY = 500;

try {
  const dataPictures = await getData();
  activatingFilters(dataPictures, debounce(createTemplateList, RERENDER_DELAY));
  renderGallery(getFilterPictures());
} catch (err) {
  showErorMesage(err.message);
}

setUserFormSubmit(oncloseFormClick);

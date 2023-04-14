
import { imageUploadPreview } from './scale.js';
import { inputUploadFile } from './form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const effectsPreviews = document.querySelectorAll('.effects__preview');

inputUploadFile.addEventListener('change', () => {
  const fileList = inputUploadFile.files[0];
  const fileName = fileList.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageUploadPreview.src = URL.createObjectURL(fileList);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${URL.createObjectURL(fileList)})`;
    });
  }
});

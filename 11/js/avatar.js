
import { imageUploadPreview } from './scale.js'; //картинка, куда мы будем выставлять превью загруженного изображения
import { inputUploadFile } from './form.js'; //поле ввода, с помощью которого пользователь выбирает изображение

// Допустимые расширения
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Обработчик на поле ввода выбора изображения
inputUploadFile.addEventListener('change', () => { //случится, когда пользователь выберет изображение
  const file = inputUploadFile.files[0]; //список файлов (первый и единственный элемент)
  const fileName = file.name.toLowerCase(); //name — свойство, в котором хранится имя файла.

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it)); //some возвращает булево значение, было ли совпадение

  if (matches) {
    imageUploadPreview.src = URL.createObjectURL(file); //позволяет сделать ссылку на содержимое file.
  }
});

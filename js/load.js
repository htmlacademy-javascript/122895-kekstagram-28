const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

// Путь
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

// Методы отправки
const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Виды ошибок
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

//
const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    throw new Error(errorText);
  }
};

// Функция получения ответа
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

// Функция отправки данных на сервер
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);


export { getData, sendData };

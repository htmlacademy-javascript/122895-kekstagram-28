const ALERT_SHOW_TIME = 5000;
const RESENDING_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErorMesage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('show-error-message');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.lineHeight = 'normal';
  alertContainer.style.opacity = '0.8';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = RESENDING_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showErorMesage, debounce };

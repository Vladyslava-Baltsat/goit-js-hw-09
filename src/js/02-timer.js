import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const elementDay = document.querySelector('[data-days]');
const elementHour = document.querySelector('[data-hours]');
const elementMinute = document.querySelector('[data-minutes]');
const elementSecond = document.querySelector('[data-seconds]');
const divEl = document.querySelector('.timer');
const divElAll = divEl.querySelectorAll('.field');
console.log(divElAll);

divEl.style.cssText =
  'font-size: 60px; font-weight: bolder; display: flex; justify-content: space-around; margin-top: 100px;';

divElAll.forEach(
  e =>
    (e.style.cssText =
      'display: flex; flex-direction: column; align-items: center;')
);

const startDate = Date.now();
let futereDate = 0;
let colorStart = false;
let intervalForColor = null;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startBtn.removeAttribute('disabled');
    futereDate = selectedDates[0].getTime();
    if (futereDate < startDate) {
      startBtn.setAttribute('disabled', 'true');
      Notiflix.Notify.init({
        position: 'center-top',
        warning: {
          background: 'yellow',
          textColor: 'red',
        },
      });
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startBtn.setAttribute('disabled', 'true');
  changeColor();
  const timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = futereDate - currentTime;
    // console.log(deltaTime);

    if (deltaTime < 900) {
      clearInterval(intervalForColor);
      startBtn.setAttribute('disabled', 'true');
      clearInterval(timerId);
    }
    const textTime = convertMs(deltaTime);
    elementSecond.textContent = textTime.seconds;
    elementMinute.textContent = textTime.minutes;
    elementHour.textContent = textTime.hours;
    elementDay.textContent = textTime.days;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  if (colorStart) {
    return;
  }
  colorStart = true;
  intervalForColor = setInterval(() => {
    divEl.style.color = getRandomHexColor();
  }, 1000);
}
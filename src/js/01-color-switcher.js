const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyEL = document.querySelector('body');

let intervalForColor = null;
let colorStart = false;
stopBtn.disabled = true;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  changeColor();
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function changeColor() {
  if (colorStart) {
    return;
  }
  colorStart = true;
  intervalForColor = setInterval(() => {
    bodyEL.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  colorStart = false;
  clearInterval(intervalForColor);
  //   bodyEL.style.backgroundColor = '#ffffff';
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

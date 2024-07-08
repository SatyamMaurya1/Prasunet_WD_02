const stopwatch = document.getElementById('stopwatch');
const time = stopwatch.querySelector('#time');
const start = stopwatch.querySelector('#start');
const pause = stopwatch.querySelector('#pause');
const reset = stopwatch.querySelector('#reset');
const lap = stopwatch.querySelector('#lap');
const laps = stopwatch.querySelector('#laps');

let intervalId;
let lapCount = 0;
let timeElapsed = 0;
let startTime = 0;
let timerRunning = false;

start.addEventListener('click', () => {
  if (!timerRunning) {
    startTime = new Date().getTime();
    intervalId = setInterval(() => {
      timeElapsed = new Date().getTime() - startTime;
      time.textContent = formatTime(timeElapsed);
    }, 10);
    timerRunning = true;
    start.textContent = 'Pause';
    pause.disabled = false;
    reset.disabled = false;
    lap.disabled = false;
  } else {
    clearInterval(intervalId);
    timerRunning = false;
    start.textContent = 'Start';
    pause.disabled = true;
    reset.disabled = true;
    lap.disabled = true;
  }
});

pause.addEventListener('click', () => {
  clearInterval(intervalId);
  timerRunning = false;
  start.textContent = 'Resume';
  pause.disabled = true;
  reset.disabled = false;
  lap.disabled = false;
});

reset.addEventListener('click', () => {
  clearInterval(intervalId);
  timeElapsed = 0;
  startTime = 0;
  time.textContent = '00:00:00.00';
  lapCount = 0;
  laps.innerHTML = '';
  timerRunning = false;
  start.textContent = 'Start';
  pause.disabled = true;
  reset.disabled = true;
  lap.disabled = true;
});

lap.addEventListener('click', () => {
  const lapTime = formatTime(timeElapsed);
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount + 1}: ${lapTime}`;
  laps.appendChild(li);
  lapCount++;
});

function formatTime(time) {
  const milliseconds = time % 100;
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor(time / (1000 * 60 * 60));

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}
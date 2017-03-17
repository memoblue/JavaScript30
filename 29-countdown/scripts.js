let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown); // clear any timer already running

  const now = Date.now();
  const then = now + (seconds * 1000);
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft >= 0) {
      displayTimeLeft(secondsLeft)
    } else {
      clearTimeout(countdown);
    }
  }, 1000);
}

function displayTimeLeft(s) {
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;

  const display = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTimeDisplay.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function setTimer() {
  const sec = parseInt(this.dataset.time);
  timer(sec);
}

buttons.forEach(bt => bt.addEventListener('click', setTimer));
document.customForm.addEventListener('submit', function(e) { // name="customForm"
  e.preventDefault();
  const mins = this.minutes.value; // name="minutes"
  timer(mins * 60);
  this.reset(); // empty field after submit
});

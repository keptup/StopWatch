const watch = document.querySelector('.watch');
const lineBtn = document.querySelector('.line-container');
const resetBtn = document.querySelector('.reset-container');

let intervalId;
let startTime;
let stopTime;
let timePassed;
let totalTimePassed = 0;
let workingClock;
let clockIsOn = false;
let stopWasClicked = false;

const msToTime = (duration) => {
  let milliseconds = parseInt(duration%1000);
	let seconds = parseInt((duration / 1000 * 1) % 60);
	let minutes = parseInt((duration / (1000 * 60)) % 60);
	let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	if (milliseconds < 10) {
    milliseconds = '00' + milliseconds;
	} else if (milliseconds < 100) {
		milliseconds = '0' + milliseconds;
	} else {
		milliseconds;
	};

	return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

watch.textContent = '00:00:00.000';
resetBtn.style.visibility = 'hidden';

lineBtn.addEventListener('click', () => {
  if (!clockIsOn && !stopWasClicked) {
    startTime = new Date().getTime();

    clockIsOn = true;
    intervalId = setInterval(() => {
      workingClock = new Date().getTime() - startTime;
      watch.textContent = msToTime(workingClock);
    }, 1)
  } else if (!clockIsOn && stopWasClicked) {
    clockIsOn = true;
    startTime = new Date().getTime();
    totalTimePassed += timePassed;

    intervalId = setInterval(() => {
      workingClock = totalTimePassed + (new Date().getTime() - startTime);
      watch.textContent = msToTime(workingClock);
    }, 1);
    resetBtn.style.visibility = 'hidden';
  } else {
    stopTime = new Date().getTime();
    timePassed = stopTime - startTime;

    clockIsOn = false;
    stopWasClicked = true;
    clearInterval(intervalId);
    resetBtn.style.visibility = 'visible';
  }

});

resetBtn.addEventListener('click', () => {
  if(!clockIsOn) {
    totalTimePassed = 0;
    clearInterval(intervalId);
    stopWasClicked = false;
    watch.textContent = '00:00:00.000';
    resetBtn.style.visibility = 'hidden';
  }
});

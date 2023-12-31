const baseurl = "https://api.adviceslip.com/advice";
advicebody = document.getElementById("advice");
let videoContainer = document.getElementById("video-container");
let startBtn = document.getElementById("start-Btn");
let playPause = document.getElementById("pause-Btn");
let mainTimer = document.querySelector("#timer");
let reset = document.getElementById("reset-Btn");
let congratulations = document.querySelector(".congratulations");
let restCountdown = document.querySelector(".getReady")
let workoutTime = 30;
let currentVideoIndex = 0;
let lastMin, lastSec;
let timerInterval;
let timerOn = false;
restTime = 5;
let remainingTime;
let exerciseStopper;
let timerStopper;

// const SetTimer = timer;
const video = document.getElementById("vid");
const Videos = ["./videos/pexels-olia-danilevich-4488002-1920x1080-25fps.mp4",
  "./videos/pexels-anna-shvets-5469608-3840x2160-24fps.mp4",
  "./videos/pexels-fauxels-3048952-3840x2160-24fps.mp4",
  "./videos/pexels-polina-tankilevitch-6525498-1920x1080-25fps.mp4",
  "https://static.videezy.com/system/resources/previews/000/005/822/original/4.mp4"
];
// console.log(videoContainer);

function nextVideo() {
  timerStopper =setTimeout(()=>{
    restFn()
  },1000*workoutTime+1)
  
  if (currentVideoIndex == Videos.length + 1 ) {
    congratulations.style.display = "block";
    clearTimeout(timerStopper)
  } else if (currentVideoIndex < Videos.length) {
    video.src = Videos[currentVideoIndex];
    // console.log(video);
    video.play();

  }
  currentVideoIndex++;
}


function startTimer(sec = 120, timer) {
  // workoutTime 
  clearInterval(timerInterval);
  let totalSeconds;
  timerOn = true;
  totalSeconds = sec;
  let min = Math.floor(sec / 60);
  sec = sec % 60;
  // if (totalSeconds > 0) {
  timerInterval = setInterval(() => {
    if (timerOn) {
      if (totalSeconds > 0) {
        if (sec < 1 && min > 0) {
          min--
          sec = 60;
        }
        totalSeconds--
        sec--;
        remainingTime = totalSeconds;
      }
      timer.innerText = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
      console.log(totalSeconds);
      if (totalSeconds == 0) {
        clearInterval(timerInterval);
        timerOn = false;
      }
    }
  }, 1000);
  // }
}
let resFnInterval;
let restInterval;

function restFn() {
  timerOn = false;
  mainTimer.style.display = "none";
  restCountdown.style.display = "block";
  restCountdown.innerText = "Take a rest!";
  let resFnInterval = setTimeout(() => {
    let seconds = restTime;
     restInterval = setInterval(() => {
      restCountdown.innerText = ` ${seconds--} `
      if (seconds < 0 ) {
        clearInterval(restInterval);
        restCountdown.innerText = "Let's G0!💪"
        setTimeout(() => {
          restCountdown.style.display = "none";
          clearInterval(resFnInterval);
          nextVideo();
          mainTimer.style.display = "block";
          startTimer(workoutTime, mainTimer);
        }, 1000)
      }
    }, 1000)
  }, 1000)
  console.log("working");
}

startBtn.addEventListener("click",()=>{
  nextVideo();
  startTimer(workoutTime, mainTimer)
})

function newRestFn(){
  mainTimer.style.display = "none";
  restCountdown.style.display = "block";
  restCountdown.innerText = "Take a rest!";
}


function resetFn(timer) {
  clearInterval(resFnInterval);
  clearInterval(restInterval);
  clearInterval(timerInterval);
  timer.innerText = `02:00`;
  totalSeconds = workoutTime;
  timerOn = false;
}
reset.addEventListener('click', () => {
  resetFn(mainTimer);
});


function pausefn() {
  if (timerOn) {
    timerOn = false;
    clearTimeout(timerStopper)
    clearInterval(restInterval);
    video.pause();
    playPause.innerText = "PLAY";
  } else {
    timerOn = true;
    video.play();
    playPause.innerText = "PAUSE";
    timerStopper =setTimeout(()=>{
      restFn()
    },1000 * remainingTime + 1);
  }
}

playPause.addEventListener('click', pausefn);


const generateadvice = async () => {
  try {
    advicebody.style.display = "block";
    const response = await fetch(baseurl);
    let responsejson = await response.json();
    console.log(response.json);
    advicebody.innerText = `"${responsejson.slip.advice}"`;
    header.innerText = `ADVICE #${responsejson.slip.id}`;
  } catch (error) {
    console.log(error);
  }
}


window.addEventListener("load", () => {
  generateadvice();
  setInterval(() => {
    generateadvice();
  }, 20000);
});
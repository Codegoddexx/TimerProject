let pause = document.getElementById("pause-Btn"),
 reset = document.getElementById("reset-Btn"),
 startBtn = document.getElementById("start-Btn"),
 mainTimer = document.querySelector("#timer"),
 play = document.getElementById("play-Btn");


const countdownTime = 2.00;

// Calculate the target time in milliseconds
const targetTime = new Date().getTime() + countdownTime * 60 * 1000;

// Update the countdown every second
const countdown = setInterval(() => {
  // Get the current time
  const currentTime = new Date().getTime();

  // Calculate the remaining time in milliseconds
  const remainingTime = targetTime - currentTime;

  // Calculate minutes and seconds
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  startBtn.addEventListener("click", () => {
    startTimer(countdownTime, mainTimer);
  });

  // Display the countdown
  timer.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Check if the countdown is finished
  if (remainingTime < 0) {
    clearInterval(countdown);
    console.log("Countdown finished!");
  }
}, 1000);

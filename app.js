console.log("NomNom is running!");

const startScreen = document.getElementById("start-screen");
const swipeScreen = document.getElementById("swipe-screen");
const resultScreen = document.getElementById("result-screen");

function showScreen(screenName) {
  startScreen.style.display = "none";
  swipeScreen.style.display = "none";
  resultScreen.style.display = "none";

  if (screenName === "start") startScreen.style.display = "block";
  if (screenName === "swipe") swipeScreen.style.display = "block";
  if (screenName === "result") resultScreen.style.display = "block";
}

showScreen("start");

const moodButtons = document.querySelectorAll(".mood-btn");

moodButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mood = btn.dataset.mood;
    console.log("Mood selected:", mood);
    showScreen("swipe");
  });
});

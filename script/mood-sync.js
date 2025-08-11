document.addEventListener("DOMContentLoaded", () => {
  syncMoodBarsFromStorage();
  if (typeof updateDogImageBasedOnMood === "function") {
    updateDogImageBasedOnMood();
  }

  // Play click sound before navigation
  const buttons = document.querySelectorAll("a");
  buttons.forEach(a => {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      const clickSound = new Audio("game-assets/confirmation_001.ogg");
      clickSound.play();
      setTimeout(() => {
        window.location.href = a.getAttribute("href");
      }, 400);
    });
  });
});
  function syncMoodBarsFromStorage() {
    const defaultColor = "#ff3366"; 

    const moods = [
      "food-progress",
      "heart-progress",
      "sleep-progress",
      "happy-progress"
    ];

    moods.forEach(id => {
      const bar = document.getElementById(id);
      if (!bar) return;

      const storedValue = parseInt(localStorage.getItem(id)) || 0;
      bar.value = storedValue;

      bar.parentElement.style.background =
        `conic-gradient(${defaultColor} ${storedValue}%, #dddddd ${storedValue}%)`;
    });
  }
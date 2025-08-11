function updateDogImageBasedOnMood() {
  const dogBtn = document.querySelector(".dog-btn");
  if (!dogBtn) return;

  // Get moods from localStorage or 0
  const foodValue = parseInt(localStorage.getItem("food-progress")) || 0;
  const hygieneValue = parseInt(localStorage.getItem("heart-progress")) || 0;
  const sleepValue = parseInt(localStorage.getItem("sleep-progress")) || 0;
  const happyValue = parseInt(localStorage.getItem("happy-progress")) || 0;

  if (window.dogLocked) return;

  // Prevent changing dog during certain states
  const existingDog = dogBtn.querySelector("img");
  if (existingDog && (
    existingDog.src.includes("bath") ||
    existingDog.src.includes("dirty-dog-inBathtub") ||
    existingDog.src.includes("bathing-dog") ||
    existingDog.src.includes("dog-character.gif") 
  )) return;

  const moodValues = { food: foodValue, hygiene: hygieneValue, sleep: sleepValue, happy: happyValue };

  const moodImages = {
    food: "game-assets/Hungry-dog.gif",
    hygiene: "game-assets/dirty-dog.gif",
    sleep: "game-assets/sleepy-dog.gif",
    happy: "game-assets/dog-character.gif",
    default: "game-assets/dog-character.gif"
  };

  const allAbove80 = Object.values(moodValues).every(v => v > 80);

  let selectedMood = "default";
  let selectedImage = moodImages.default;

  // Pick mood with lowest value if any under 80
  if (!allAbove80) {
    selectedMood = Object.keys(moodValues).reduce((lowest, key) => {
      return moodValues[key] < moodValues[lowest] ? key : lowest;
    }, "food");
    selectedImage = moodImages[selectedMood];
  }

  localStorage.setItem("allowed-mood-page", selectedMood);

  // Create and show new dog image
  const dogImg = document.createElement("img");
  dogImg.src = selectedImage + "?v=" + Math.random();
  dogImg.alt = "Dog Mood";
  dogImg.classList.add("dog-mood-img", `dog-${selectedMood}`);

  dogBtn.innerHTML = "";
  dogBtn.appendChild(dogImg);
}

document.addEventListener("DOMContentLoaded", () => {
  updateDogImageBasedOnMood();
});
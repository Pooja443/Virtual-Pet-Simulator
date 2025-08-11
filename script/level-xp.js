// Save XP and level to localStorage
function saveXP(level, xp) {
  localStorage.setItem("level", level);
  localStorage.setItem("xp", xp);
}

// Show XP and Level UI on screen
function showXPUI() {
  var level = parseInt(localStorage.getItem("level")) || 1;
  var xp = parseInt(localStorage.getItem("xp")) || 0;

  var xpNeeded = level * 100;
  var percent = (xp / xpNeeded) * 100;

  var bar = document.getElementById("xp-fill");
  var levelText = document.getElementById("level-text");

  if (bar && levelText) {
    levelText.textContent = "Level: " + level;
    bar.style.width = percent + "%";
    bar.style.transition = "width 1.5s ease-in-out";
  }
}

// Give XP and handle level-up logic with 100 coins reward
function gainXP(amount) {
  var xp = parseInt(localStorage.getItem("xp")) || 0;
  var level = parseInt(localStorage.getItem("level")) || 1;
  var xpNeeded = level * 100;

  xp = xp + amount;

  if (xp >= xpNeeded) {
    xp = xp - xpNeeded;
    level = level + 1;

    // Give 100 coins on level up
    var coins = parseInt(localStorage.getItem("coins")) || 0;
    coins = coins + 100;
    localStorage.setItem("coins", coins);

    // Update visible coin count
    var coinText = document.querySelector(".coins-count");
    if (coinText) {
      coinText.textContent = coins;
    }
  }

  localStorage.setItem("level", level);
  localStorage.setItem("xp", xp);

  showXPUI();
}

// Check if all mood bars are full
function checkFullBarsAndReward() {
  var bars = ["heart-progress", "food-progress", "happy-progress", "sleep-progress"];

  var allFull = true;
  for (var i = 0; i < bars.length; i++) {
    var value = parseInt(localStorage.getItem(bars[i])) || 0;
    if (value < 100) {
      allFull = false;
      break;
    }
  }

  if (allFull) {
    // Reset all bars to 0
    for (var i = 0; i < bars.length; i++) {
      localStorage.setItem(bars[i], "0");
    }

    // Reward XP with 50 points when all full
    gainXP(50);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Show XP bar and level on page load
  showXPUI();
});
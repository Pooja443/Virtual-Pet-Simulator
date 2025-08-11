function increaseMode(id, counterName, color = "#ff3366") {
  if (window[counterName] === undefined) window[counterName] = 0; // initial counter

  const progress = document.getElementById(id);
  if (!progress) return; // return if no element found

  if (parseInt(progress.value) >= 100) return; 

  const interval = setInterval(() => {
    let currentValue = parseInt(progress.value); // get current value
    let newValue = Math.min(currentValue + 1, 100);
    progress.value = newValue; // update value

    progress.parentElement.style.background = `conic-gradient(${color} ${newValue}%, #dddddd ${newValue}%)`; // update background
    progress.parentElement.style.transition = "background 0.5s ease-in-out"; 

    window[counterName]++; 

    if (window[counterName] >= 10) { 
      clearInterval(interval); // stop interval
      window[counterName] = 0; // reset counter

      localStorage.setItem(id, newValue); // save progress
      gainXP(5); // add XP points
      checkFullBarsAndReward(); // check bars full
      showXPUI(); 

      if (newValue >= 100) {
        if (window.moodResetTimers[id]) {
          clearTimeout(window.moodResetTimers[id]); // clear old reset timer
        }

        window.moodResetTimers[id] = setTimeout(() => {
          resetMoodBar(id); // reset bar after 3 mins
        }, 180000); 
      }

      updateDogImageBasedOnMood(); // refresh dog image
    }
  }, 200);
}
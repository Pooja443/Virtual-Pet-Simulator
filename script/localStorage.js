document.addEventListener("DOMContentLoaded", () => {
  window.moodResetTimers = window.moodResetTimers || {}; // global timers object

  document.querySelectorAll("input[type='range']").forEach(input => {
    const stored = localStorage.getItem(input.id); // get saved value

    if (stored !== null) {
      input.value = stored; // set input value
      input.parentElement.style.background = `conic-gradient(#ff3366 ${stored}%, #dddddd ${stored}%)`; // color bar fill

      if (parseInt(stored) >= 100) {
        if (window.moodResetTimers[input.id])
          clearTimeout(window.moodResetTimers[input.id]); // clear old timer

        window.moodResetTimers[input.id] = setTimeout(() => {
          input.value = 0; // reset value
          localStorage.setItem(input.id, "0"); // save reset
          input.parentElement.style.background = "conic-gradient(#dddddd 0%, #dddddd 100%)"; // reset color
          console.log(`Auto-reset ${input.id} after 3 minutes`); // debug log
        }, 180000); // 3 minutes timeout
      }
    }

    input.addEventListener("input", () => {
      const val = input.value; // get current value
      localStorage.setItem(input.id, val); // save value
      input.parentElement.style.background = `conic-gradient(#ff3366 ${val}%, #dddddd ${val}%)`; // update bar color

      if (parseInt(val) >= 100) {
        if (window.moodResetTimers[input.id])
          clearTimeout(window.moodResetTimers[input.id]); // clear old timer

        window.moodResetTimers[input.id] = setTimeout(() => {
          input.value = 0; // reset value
          localStorage.setItem(input.id, "0"); // save reset
          input.parentElement.style.background = "conic-gradient(#dddddd 0%, #dddddd 100%)"; // reset color
          console.log(`Auto-reset ${input.id} after 3 minutes`); // debug log
        }, 180000); // 3 minutes timeout
      }
    });
  });
});
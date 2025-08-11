(function () {
  checkMoodResetOnInactivity();

  function checkMoodResetOnInactivity() {
    const lastVisit = localStorage.getItem("lastVisitTime");
    const now = Date.now();

    if (lastVisit) {
      const timeDiff = now - parseInt(lastVisit, 10);
      const oneHour = 60 * 60 * 1000;

      if (timeDiff > oneHour) {
        resetAllMoodBars();
      }
    }

    localStorage.setItem("lastVisitTime", now.toString());
  }

  function resetAllMoodBars() {
    const barIds = [
      "heart-progress",   
      "happy-progress",  
      "food-progress",   
      "sleep-progress"   
    ];

    barIds.forEach(id => {
      const bar = document.getElementById(id);
      if (bar) {
        bar.value = 0;
        localStorage.setItem(id, "0");

        const wrapper = bar.parentElement;
        if (wrapper) {
          wrapper.style.background = "conic-gradient(#dddddd 0%, #dddddd 100%)";
        }
      }
    });

   
  }
})();
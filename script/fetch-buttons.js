fetch('buttons.html') // get buttons HTML
  .then(response => response.text())
  .then(html => {
    document.getElementById('buttons-placeholder').innerHTML = html; // put buttons on page

    const allowedMood = localStorage.getItem("allowed-mood-page") || "default"; // get allowed mood

    const pageMap = { // mood to page
      food: "food-page.html",
      hygiene: "hygiene.html",
      sleep: "sleep.html",
      happy: "hallway.html",
      default: "garden-page.html"
    };

    const allowedHref = pageMap[allowedMood] || "garden-page.html"; // get allowed page link

    const wrapper = document.querySelector(".mood-btn-wrapper"); // find mood buttons area
    if (!wrapper) {
      return;
    }

    const allLinks = wrapper.querySelectorAll("a"); // get all links in mood buttons

    allLinks.forEach(link => {
      const href = link.getAttribute("href");

      if (href === allowedHref || href === "garden-page.html") return; // keep allowed links active

      // block other links
      link.addEventListener("click", e => {
        e.preventDefault(); // stop click
        alert("Your dog needs something else first!"); // tell user
      });
      link.style.pointerEvents = "none"; // disable click
      link.style.opacity = "0.4"; // make look faded
      link.style.filter = "grayscale(100%)"; // make black and white
    });

    // add click sound to allowed links
    allLinks.forEach(a => {
      if (a.style.pointerEvents !== "none") {
        a.addEventListener("click", function (e) {
          e.preventDefault(); // stop normal click
          const clickSound = new Audio("game-assets/confirmation_001.ogg");
          clickSound.play(); // play sound
          setTimeout(() => {
            window.location.href = a.getAttribute("href"); // go to page after sound
          }, 400);
        });
      }
    });

    // back button 
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        window.location.href = 'garden-page.html'; // go back to garden page
      });
    }

    // after wait, update XP and bars
    setTimeout(() => {
      if (typeof showXPUI === 'function') {
        showXPUI(); // show XP bar
      }

      // set bars from saved data
      document.querySelectorAll("input[type='range']").forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
          input.value = savedValue;
          input.parentElement.style.background = `conic-gradient(#ff3366 ${savedValue}%, #dddddd ${savedValue}%)`;
        }
      });
    }, 800);
  });
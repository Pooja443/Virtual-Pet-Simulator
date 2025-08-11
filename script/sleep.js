const switchButton = document.querySelector(".day-window"); // Button to toggle day/night
let dayBed = document.querySelector(".day-bed"); // The daytime bed image
let dogButton = document.querySelector(".dog-btn"); // The dog image/button
const sleepDogImage = document.createElement("img"); // Will hold the sleeping dog image

let nightBedImage;
let isNight = false;
let sleepStarted = false;
let sleepTimer;
let sleepComplete = false;

// Toggle between day and night
switchButton.addEventListener("click", () => {
    if (isNight) {
    showDay();
    } else {
    showNight();
    }
    isNight = !isNight;
    });

// Function for night view
function showNight() {
    document.body.style.background = 'url("game-assets/night-theme-bedroom.png") no-repeat center';
    document.body.style.backgroundSize = "cover";

    // Replace day bed with night bed
    nightBedImage = document.createElement("img");
    nightBedImage.src = "game-assets/night-theme-bed.png";
    nightBedImage.classList.add("night-bed");
    dayBed.remove();
    document.body.appendChild(nightBedImage);

    // Reset sleep state
    sleepStarted = false;
    sleepComplete = false;

    // When bed is clicked, start sleeping
    nightBedImage.addEventListener("click", startSleeping);
}

// Function when dog goes to sleep
function startSleeping() {
    dogButton.remove(); // Remove current dog image

    sleepDogImage.src = "game-assets/sleeping-dog.gif";
    sleepDogImage.classList.add("sleeping-dog");
    document.body.appendChild(sleepDogImage);
    showCustomAlert("Dog must sleep 5min");
    let currentValue = parseInt(localStorage.getItem("sleep-progress")) || 0;

    // Interval to increase mood & refresh bar
    sleepInterval = setInterval(() => {
        currentValue = Math.min(currentValue + 20, 100); // add 20 up to max 100
        localStorage.setItem("sleep-progress", currentValue);

        const sleepBar = document.getElementById("sleep-progress");
        if (sleepBar) {
            sleepBar.value = currentValue; // update bar live without reload
        }
        // Stop when full
        if (currentValue >= 100) {
            clearInterval(sleepInterval);
            sleepComplete = true;
        }
    }, 30 * 1000); 

    sleepTimer = setTimeout(() => {
        currentValue = 100;
        localStorage.setItem("sleep-progress", 100);
        const sleepBar = document.getElementById("sleep-progress");
        if (sleepBar) sleepBar.value = 100;
        sleepComplete = true;
    }, 5 * 60 * 1000);

    sleepStarted = true;
}


// Function for day view
function showDay() {
    document.body.style.background = 'url("game-assets/day-theme-bedroom.png") no-repeat center';
    document.body.style.backgroundSize = "cover";

    if (sleepStarted) {
        // If sleep wasn't done, cancel timer
        if (!sleepComplete && sleepTimer) {
            clearTimeout(sleepTimer);
            sleepTimer = null;
        }

    sleepDogImage.remove(); // Remove sleeping dog image

    if (sleepComplete) {
        // If dog finished sleeping
        const awakeDog = document.createElement("img");
        awakeDog.src = "game-assets/dog-character.gif";
        awakeDog.classList.add("dog-wakedup");
        document.body.appendChild(awakeDog);
    }
    else {
        // If dog didn’t finish sleep adding sleepy dog again
        dogButton = document.createElement("button");
        dogButton.classList.add("dog-btn");
        dogButton.innerHTML = `<img src="game-assets/sleepy-dog.gif">`;
        document.body.appendChild(dogButton);
    }
}
else {
    // If dog never went to sleep
    dogButton = document.createElement("button");
    dogButton.classList.add("dog-btn");
    dogButton.innerHTML = `<img src="game-assets/sleepy-dog.gif">`;
    document.body.appendChild(dogButton);
}

// Remove night bed and bring back day bed
nightBedImage.remove();
dayBed = document.createElement("img");
dayBed.src = "game-assets/day-theme-bed.png";
dayBed.classList.add("day-bed");
document.body.appendChild(dayBed);
}
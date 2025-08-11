let isUsedByother = false;
// Get elements
const sponge = document.querySelector(".sponge");
const bathtub = document.querySelector(".bathtub-btn");
const DogInitialChar = document.querySelector(".dog-character");

// Create images
const DogInBathtub = document.createElement("img");
const DogWithBubbles = document.createElement("img");
const showerHead = document.querySelector(".shower-head");
const backToDogbtn = document.createElement("button");
const BathedDog = document.createElement("img");

// Sponge clicked flag
let isSpongeCalled = false;

// Start bath
function bathtuboperation() {
    if (isUsedByother || window.dogLocked) return; // Stop if locked
    window.dogLocked = true; // Lock dog
    isUsedByother = true; // Mark used

    const dogBtn = document.querySelector(".dog-btn");
    dogBtn.innerHTML = ""; // Clear dog

    // Show dirty dog in tub
    DogInBathtub.src = "game-assets/dirty-dog-inBathtub.gif";
    DogInBathtub.classList.add("bathing-dog");
    document.body.appendChild(DogInBathtub);

    callSponge(); // Setup sponge
    callShower(); // Setup shower

    increaseMode("heart-progress", "hygineUpdates"); // Increase hygiene mood
}

// Add bathtub click listener
function bathfunction() {
    bathtub.addEventListener("click", bathtuboperation);
}

// Sponge click event
function callSponge() {
    sponge.addEventListener("click", () => {
    DogWithBubbles.src = "game-assets/bathing-dog (1).gif";
    DogWithBubbles.classList.add("bathing-dog");
    DogInBathtub.remove(); // Remove dirty dog
    document.body.appendChild(DogWithBubbles); // Show bubbles
    isSpongeCalled = true; // Sponge clicked
    }, { once: true });
}

// Shower click event
function callShower() {
    showerHead.addEventListener("click", () => {
    if (!isSpongeCalled) return; // Stop if no sponge

    const shower = document.createElement("img");
    shower.src = "game-assets/shower-head.gif";
    shower.classList.add("shower");

    showerHead.remove(); // Remove old shower
    document.body.appendChild(shower); // Add shower gif

    window.dogLocked = true; // Lock dog again

    DogWithBubbles.remove(); // Remove bubbles dog

    BathedDog.src = "game-assets/bath-dog-initial.gif";
    BathedDog.classList.add("bathed-dog");

    backToDogbtn.appendChild(BathedDog); // Add bathed dog
    document.body.appendChild(backToDogbtn);

    // Back button click
    backToDogbtn.addEventListener("click", () => {
        isUsedByother = false; // Unlock dog
        backToDogbtn.remove(); // Remove button
        BathedDog.remove(); // Remove dog

        document.body.replaceChild(showerHead , shower); // Restore shower head

        const cleanDog = document.createElement("img");
        cleanDog.src = "game-assets/happy-dog.gif";
        cleanDog.classList.add("dog-character");

        const dogBtn = document.querySelector(".dog-btn");
        dogBtn.innerHTML = ""; // Clear dog
        dogBtn.appendChild(cleanDog); // Add happy dog

        bathtub.addEventListener("click", bathtuboperation, { once: true }); // Allow new bath
    }, { once: true });
    });
}

bathfunction(); // Start bath listener

// Toilet and lavatory elements
const lavatoryColumn = document.querySelector(".lavatory-column");
let toilet = document.querySelector(".toilet");
const flush = document.querySelector(".flush-btn");
const dogBtn = document.querySelector(".dog-btn");
let toiletSound;

// Toilet usage function
function handleToiletEvents() {
    if (isUsedByother) return; // Stop if busy
    isUsedByother = true; // Mark used

    dogBtn.innerHTML = ""; // Clear dog
    const toiletDog = document.createElement("img");
    toiletDog.src = "game-assets/dog-character.gif";
    toiletDog.classList.add("dog-character");
    dogBtn.appendChild(toiletDog); // Show dog

    dogBtn.classList.add("dog-lavatory"); // Style dog lavatory

    // Open toilet lid image
    const toiletLidOpened = document.createElement("img");
    toiletLidOpened.src = "game-assets/toilet-lid-open.png";
    toiletLidOpened.classList.add("toilet");
    lavatoryColumn.replaceChild(toiletLidOpened, toilet);

    // Play toilet sound loop
    toiletSound = new Audio("game-assets/pooing-in-a-toilet-81312.mp3");
    toiletSound.loop = true;
    toiletSound.play();

    increaseMode("heart-progress", "hygineUpdates"); // Increase mood

    dogBtn.addEventListener("click", resetToilet, { once: true }); // Reset on click
}

// Reset toilet usage
function resetToilet() {
    if (toiletSound) toiletSound.pause(); // Stop sound

    dogBtn.classList.remove("dog-lavatory"); // Remove style

    // Create new toilet button
    const newToilet = document.createElement("button");
    newToilet.classList.add("toilet");
    const toiletImg = document.createElement("img");
    toiletImg.src = "game-assets/toilet-img.png";
    toiletImg.loading = "lazy";
    newToilet.appendChild(toiletImg);

    // Replace opened lid with button
    const lidImg = lavatoryColumn.querySelector(".toilet");
    lavatoryColumn.replaceChild(newToilet, lidImg);
    toilet = newToilet;

    // Add click listener again
    toilet.addEventListener("click", handleToiletEvents);

    isUsedByother = false; // Unlock dog
}

// Listen toilet button clicks
document.addEventListener("click", (e) => {
    if (e.target.closest(".toilet")) {
    handleToiletEvents();
    }
});

// Flush button sound delay
flush.addEventListener("click", () => {
    const flushSound = new Audio("game-assets/flush-toilet-lid-down-68571.mp3");
    setTimeout(() => flushSound.play(), 1000);
});
const ballContainer = document.querySelector(".ball-container");
const ball = document.querySelector(".ball");
const ballImg = document.querySelector(".ball-image");
const dogBtn = document.querySelector(".dog-btn");
dogBtn.style.display = "none";
ball.addEventListener("click", () => {
    ball.innerHTML = "";
    const movingBall = document.createElement("img");
    movingBall.classList.add("moving-ball");
    movingBall.src = "game-assets/ball-bouncing.gif";
    ballContainer.appendChild(movingBall);

    const dogImg = document.querySelector(".dog-character");
    if (dogImg) {
    dogImg.src = "game-assets/dog-jumping.gif";

    setTimeout(() => {
        dogImg.src = "game-assets/dog-character.gif";
    }, 4800);
    }

    setTimeout(() => {
    movingBall.remove();
    ball.innerHTML = `<img class="ball-image" src="game-assets/ball-image.png">`;
    ballContainer.appendChild(ball);
        increaseMode("happy-progress", "smileupdates");
    }, 4800);
});
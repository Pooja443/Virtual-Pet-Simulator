fetch("UI-icons.html").then(response => response.text())
.then(html =>{
    document.getElementById("ui-icons").innerHTML = html;

    const homeBtn = document.querySelector(".home-btn");
    const soundBtn = document.querySelector(".on-btn");
    const soundContainer = document.querySelector(".icons");
    const sound = new Audio("game-assets/bg music.mp3");
    let soundOff = true;
    const onBtn = document.createElement("button");       
    const onimg = document.createElement("img");
    onimg.src = "game-assets/volume-on-btn.png";
    onBtn.appendChild(onimg);

    if (!soundOff) {
        soundContainer.replaceChild(onBtn, soundBtn);
    }

    homeBtn.addEventListener("click",()=>{
        window.location.href = "homepage.html"
    })
    soundBtn.addEventListener("click", function(){
        soundContainer.replaceChild(onBtn, soundBtn);
        soundOff= false;
        sound.play();
    })

    onBtn.addEventListener("click", function(){
        soundContainer.replaceChild(soundBtn , onBtn)
        soundOff = true;
        sound.pause();
    })
})
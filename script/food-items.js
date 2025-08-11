window.addEventListener('DOMContentLoaded', () => {
    const foodItems = [
    { 
        name: "avocado", 
        image: "avacado-removebg-preview.png", 
        price: 12 
    },
    { 
        name: "burger", 
        image: "burger-removebg-preview.png", 
        price: 40 
    },
    { 
        name: "pizza", 
        image: "pizza-removebg-preview.png", 
        price: 120 
    },
    { 
        name: "butter", 
        image: "butter-removebg-preview.png", 
        price: 150 
    },
    { 
        name: "ice-cream", 
        image: "ice-cream-removebg-preview.png", 
        price: 140 
    },
    { 
        name: "cake", 
        image: "cake-removebg-preview.png", 
        price: 25 
    },
    { 
        name: "carrot", 
        image: "carrot-removebg-preview.png", 
        price: 14 
    },
    { 
        name: "milk", 
        image: "milk.png", 
        price: 180 
    },
    { 
        name: "cheese", 
        image: "cheese-removebg-preview.png", 
        price: 125 
    },
    { 
        name: "chicken", 
        image: "chicken-removebg-preview.png", 
        price: 200 
    },
    { 
        name: "popcorn", 
        image: "image-removebg-preview (2).png", 
        price: 40 
    },
    { 
        name: "coke", 
        image: "coke-removebg-preview.png", 
        price: 150 
    },
    { 
        name: "corn", 
        image: "corn-removebg-preview.png", 
        price: 30 
    },
    { 
        name: "ice-scoop", 
        image: "ice-scoop-removebg-preview.png", 
        price: 240 
    },
    { 
        name: "taco", 
        image: "image-removebg-preview (3).png", 
        price: 40 
    },
    { 
        name: "donut", 
        image: "donut-removebg-preview.png", 
        price: 70 
    },
    { 
        name: "eggplant", 
        image: "eggplant-removebg-preview.png", 
        price: 8 
    },
    { 
        name: "fries", 
        image: "fries-removebg-preview.png", 
        price: 190 
    }
    ];

    const foodItemsContainer = document.getElementById("food-items");
    const rowClasses = ["first-row", "second-row", "third-row"];

    // create rows loop
    for (let i = 0; i < foodItems.length; i += 6) {
    const row = document.createElement("div"); // create row div
    row.classList.add(rowClasses[i / 6]); // add row class
    const items = foodItems.slice(i, i + 6); // get 6 items

    // create food items loop
    items.forEach(({ image, price }) => {
        const item = document.createElement("div"); // create wrap div
        item.classList.add("wrap"); // add wrap class
        item.innerHTML = `
        <img src="food-images/${image}" alt="food" loading="lazy" />
        <button class="add">
            <img src="game-assets/coins.png" alt="coin" loading="lazy" />
            <span class="price">${price}</span>
        </button>
        `; // set inner html
        row.appendChild(item); // add item to row
    });

    foodItemsContainer.appendChild(row); // add row to container
    }

    // click event listener
    document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add"); // find add button
    if (!addBtn) return; // stop if not add btn

    const wrap = addBtn.closest(".wrap"); 
    const foodImg = wrap.querySelector("img[alt='food']");
    const price = parseInt(addBtn.querySelector(".price").textContent); 

    let coins = parseInt(localStorage.getItem("coins")) || 0; 
    let cart = JSON.parse(localStorage.getItem("cartItems")) || []; 

    // check max cart size
    if (cart.length >= 5) {
        new Audio("game-assets/error.mp3").play(); // play error
        setTimeout(() => showCustomAlert("You reached the limit!"), 100); // show alert
        return;
    }

    // check coins
    if (coins < price) {
        new Audio("game-assets/error.mp3").play(); // play error
        setTimeout(() => showCustomAlert("Not enough coins!"), 100); // show alert
        return;
    }

    cart.push(foodImg.src); // add to cart
    localStorage.setItem("cartItems", JSON.stringify(cart)); // save cart

    coins -= price; // subtract coins
    localStorage.setItem("coins", coins); // save coins

    new Audio("game-assets/added-sound.mp3").play(); // play sound

    const coinElement = document.querySelector(".coins-count"); // get coins count
    if (coinElement) coinElement.textContent = coins; // update coins
    });

    // load buttons html
    document.querySelector(".back-btn").addEventListener("click",()=>{
        window.location.href = "food-page.html";
    })
});
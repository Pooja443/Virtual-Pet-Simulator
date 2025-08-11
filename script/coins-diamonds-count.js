fetch("coins.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("coins-placeholder").innerHTML = html;

    const coinValue = document.querySelector(".coins-count");

    let storedCoins = parseInt(localStorage.getItem("coins"));
    if (!storedCoins || storedCoins < 0) {
      storedCoins = 100;
      localStorage.setItem("coins", storedCoins);
    }

    if (coinValue) {
      coinValue.textContent = storedCoins;
    }
  });
function showCustomAlert(message) {
  const alertOverlay = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("custom-alert-message");
  const alertOkBtn = document.getElementById("custom-alert-ok");

  alertMessage.textContent = message;
  alertOverlay.style.display = "flex";

  function closeAlert() {
    alertOverlay.style.display = "none";
    alertOkBtn.removeEventListener("click", closeAlert);
  }

  alertOkBtn.addEventListener("click", closeAlert);
}
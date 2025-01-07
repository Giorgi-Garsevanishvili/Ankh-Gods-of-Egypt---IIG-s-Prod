export function displayMessage(messageText, timer, API) {
  const messageBox = document.querySelector(".blur");
  const message = document.querySelector(".messagetext");
  const closeButton = document.querySelector(".close-button");
  const APIbox = document.querySelector(".api-html");
  const APIhtml = `<img class="API-logo-message" src="./images/API Logos/api.png" alt="">`;

  if (API === "yes" && !APIbox.innerHTML.includes(APIhtml)) {
    APIbox.innerHTML += APIhtml;
  } else if (API === "no") {
    APIbox.innerHTML = "";
  }

  closeButton.addEventListener("click", () => {
    messageBox.classList.add("hidden");
  });

  message.textContent = messageText;

  messageBox.classList.remove("hidden");
  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, timer);
}

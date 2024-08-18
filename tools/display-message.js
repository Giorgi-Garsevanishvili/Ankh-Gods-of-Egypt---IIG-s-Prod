export function displayMessage (messageText, timer) {
  const messageBox = document.querySelector('.blur');
  const message = document.querySelector('.message');

  message.textContent = messageText;
  
  messageBox.classList.remove('hidden');
  setTimeout(() => {
    messageBox.classList.add('hidden');
  }, timer);
}
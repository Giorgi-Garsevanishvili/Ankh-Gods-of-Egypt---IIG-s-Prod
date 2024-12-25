export function displayMessage (messageText, timer) {
  const sound = document.getElementById('notification-sound');
  const messageBox = document.querySelector('.blur');
  const message = document.querySelector('.message');

  
  message.textContent = messageText;
  
  messageBox.classList.remove('hidden');
  sound.play();
  setTimeout(() => {
    messageBox.classList.add('hidden');
    sound.pause(); 
  }, timer);
}
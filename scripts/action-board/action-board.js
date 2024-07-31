import { actionBoardData, EventBoardData } from "../../data/action-board-data.js";

let activeButtonIndex = 0; 

function renderActionBoard() {
  let boardHTML = document.querySelector('.board-html');
  let actionBoardHTML = '';
  let eventBoardHTML = '';

  EventBoardData.forEach((item) => {
    eventBoardHTML += `
    <div class="event-board">
      <div id="${item.id}" class="event-button event-button-${item.styleLink.primary}" data-id="${item.id}">
        <img class="icon-button-style" src="${item.icon}" alt="">
      </div>
    </div>
    <img class="icon-button-play-event arrow-${item.styleLink.secondary}" src="./images/action-board/play.png" alt="">
    `;
  });

  actionBoardData.forEach((item) => {
    actionBoardHTML += `
    <div id="${item.id}" class="actions-board">
      <div class="action-square">
        <div class="figures">
          <div class="title-image"></div>
          <div class="title"><h5>${item.title}</h5></div>
          <div class="icon-items">
            ${[...Array(6)].map(() => `
              <button class="icon-button icon-button-${item.styleLink}" data-id="${item.id}">
                <img class="icon-button-style" src="${item.icon}" alt="">
              </button>
              <img class="icon-button-play" src="./images/action-board/play.png" alt="">
            `).join('')}
            <button class="icon-button icon-button-${item.styleLink} icon-button-last last-${item.styleLink}">
              <img class="icon-button-style" src="${item.icon}" alt="">
            </button>
            <img class="icon-button-play-${item.styleLink}" src="./images/action-board/play.png" alt="">
          </div>
        </div>
      </div>
    </div>`;
  });

  boardHTML.innerHTML = `
  <div class="action-board-container">${actionBoardHTML}</div>
  <div class="event-board-container hidden">${eventBoardHTML}</div>
  `;

  const buttons = document.querySelectorAll('.next-button, .prev-button');
  const eventButtons = document.querySelectorAll('.event-button');

  function switchToNextButton() {
    const totalButtons = eventButtons.length;
    
    // Remove 'active' class from the current button
    eventButtons[activeButtonIndex].classList.remove('on');
    
    // Update the index of the active button
    activeButtonIndex = (activeButtonIndex + 1) % totalButtons; 
    
    // Add 'active' class to the new active button
    eventButtons[activeButtonIndex].classList.add('on');
    
    // Update the button's ID to manage 'disabled' state correctly
    eventButtons.forEach((button, index) => {
      button.disabled = (index !== activeButtonIndex);

      console.log(activeButtonIndex);
      console.log(totalButtons);
    });

    if (activeButtonIndex === totalButtons - 1 ) {
      alert('END OF THE MATCH')
    }
  }

  function toggleBoard() {
    const actionBoardContainer = document.querySelector('.action-board-container');
    const eventBoardContainer = document.querySelector('.event-board-container');
    const downArrowSection = document.querySelector('.down-arrow-section');
    
    if (actionBoardContainer.classList.contains('hidden')) {
      actionBoardContainer.classList.remove('hidden');
      eventBoardContainer.classList.add('hidden');
      downArrowSection.classList.remove('hidden');
      document.querySelector('.page-title').textContent = 'Action Board';
    } else {
      actionBoardContainer.classList.add('hidden');
      eventBoardContainer.classList.remove('hidden');
      downArrowSection.classList.add('hidden');
      document.querySelector('.page-title').textContent = 'Event Board';
    }
  }

  buttons.forEach(button => button.addEventListener('click', toggleBoard));

  // Initialize the first button as active
  if (eventButtons.length > 0) {
    eventButtons[activeButtonIndex].classList.add('on');
    eventButtons.forEach((button, index) => {
      button.disabled = (index !== activeButtonIndex);
    });
  }
 
  // Add event listener for button switching
  eventButtons.forEach(button => {
    button.addEventListener('click', switchToNextButton);
  });
}

renderActionBoard();

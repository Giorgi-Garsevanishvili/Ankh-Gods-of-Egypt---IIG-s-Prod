import { actionBoardData, EventBoardData } from "../../data/action-board-data.js";


// function PlayerAmount (){
//   let playerAmount = document.querySelector('.player-selector-style')
//   if (){}
// }

let activeButtonIndex = 0; 
let activeActionButtonIndices = {};
let actionCount = 3;
let mfCount;
let sfCount;
let gfCount;


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
            ${[...Array(item.amount)].map(() => `
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

  function checkActionCount(){
    if (actionCount === 0) {
      alert('Your Action Registered!')
      ResetActionCount();
    }
  }

  function getActionButtonsByClass(pattern) {
    return document.querySelectorAll(`.icon-button-${pattern}`);
  }

  function switchToNextActiontButton(pattern) {
    const actionButtons = getActionButtonsByClass(pattern);
    const totalButtons = actionButtons.length - 1;

    if (totalButtons === 0) {
      console.log('No action buttons available');
      return;
    }

    // Initialize the active index for this pattern if not already done
    if (!(pattern in activeActionButtonIndices)) {
        activeActionButtonIndices[pattern] = 0;
   }

    let currentIndex = activeActionButtonIndices[pattern];

    // Remove 'active' class from the current button
    actionButtons[currentIndex].classList.remove('on');
    
    // Update the index of the active button
    currentIndex = (currentIndex + 1) % totalButtons; 
    
    // Add 'active' class to the new active button
    actionButtons[currentIndex].classList.add('on');
    
    // Update the button's ID to manage 'disabled' state correctly
    actionButtons.forEach((button, index) => {
      button.disabled = (index !== currentIndex);
    });

    activeActionButtonIndices[pattern] = currentIndex

    console.log(currentIndex);
    if (currentIndex ===  0) {
      actionButtons[currentIndex + totalButtons].classList.add('opacity')
      setTimeout(() => {actionButtons[currentIndex + totalButtons].classList.remove('opacity')}, 4000 );
      ResetActionCount();
      alert(`Current Action Row Reset!`)
    }
  }

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

actionBoardData.forEach((item) => {
  const actionButtons = getActionButtonsByClass(item.styleLink);
  if (actionButtons.length > 0) {
    if (!(item.styleLink in activeActionButtonIndices)) {
      activeActionButtonIndices[item.styleLink] = 0;
    }

    let currentIndex = activeActionButtonIndices[item.styleLink];
    actionButtons[currentIndex].classList.add('on');
    actionButtons.forEach((button, index) => {
      button.disabled = (index !== currentIndex);
    });

     // Add event listener for button switching
  actionButtons.forEach(button => {
    button.addEventListener('click', () => {

      if (item.styleLink === 'MF') {
        if (actionCount === 2) {
          renderActionCount();
          switchToNextActiontButton(item.styleLink);
          mfCount = 1;
        } else if (actionCount === 1) {
          alert('In this round you can`t use this action anymore, please try another!');
        } else  {
          alert ('Action Count Reset! Next Player!');
          ResetActionCount();
        }
      }
  
      if (item.styleLink === 'SF') {
        if (actionCount === 2 || mfCount === 1 && actionCount > 0) {
          sfCount = 1;
          renderActionCount();
          switchToNextActiontButton(item.styleLink);
          checkActionCount();
        } else if (sfCount === 1 && actionCount === 2 && actionCount > 0) {
          alert('In this round you already used this move, please try another!');
        } else if (sfCount === 1 || actionCount === 1) {
          alert('In this round you can`t use this action anymore, please try another!');
        } 
      }
  
      if (item.styleLink === 'GF') {
        if (actionCount === 2 || sfCount === 1 && actionCount > 0) {
          gfCount = 1;
          renderActionCount();
          switchToNextActiontButton(item.styleLink);
          checkActionCount();
        } else if (actionCount === 2 || mfCount === 1 && actionCount > 0) {
          gfCount = 1;
          renderActionCount();
          switchToNextActiontButton(item.styleLink);
        } else if (gfCount === 1 && actionCount < 2 && actionCount > 0) {
          alert('In this round you already used this move, please try another!');
        } else {
          ResetActionCount();
        }
      }
  
      if (item.styleLink === 'UAP') {
        if (actionCount <=2 && actionCount > 0) {
          renderActionCount();
          switchToNextActiontButton(item.styleLink);
          alert('Your action Registered!')
          ResetActionCount();
        } else {
          alert('no more actions')
        }
      }
      
    });
      });
    }
  });
}

function ResetActionCount (){
  mfCount = 0;
  sfCount = 0;
  gfCount = 0;
  actionCount = 2;
  document.querySelector('.action-count-reset').classList.add('hidden')
  displayActionCount();
  alert('Action Count Reset! Next Playet Please!')
}

function displayActionCount () {
  document.querySelector('.actions-counter-monitor').innerHTML = actionCount;
}

function renderActionCount (amount) {
  if (actionCount > 0 && actionCount <=3){
    actionCount --- amount;
  } else if (actionCount === 0) {
    alert('no more actions')
    ResetActionCount();
  }

  if (actionCount <2) {
    document.querySelector('.action-count-reset').classList.remove('hidden')
  }


  displayActionCount();
}



document.querySelector('.action-count-reset').addEventListener('click', () => {
  if (actionCount === 2) {
    return
  } else {
  ResetActionCount();
  }
})


renderActionCount();
renderActionBoard();

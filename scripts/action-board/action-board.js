import { actionBoardData, devotionBoardData, EventBoardData } from "../../data/action-board-data.js";
import {resetTimer, stopTimer} from "../timer.js"


let actionHistory = [];


let activeButtonIndex = 0; 
let activeActionButtonIndices = {};
let actionCount = 3;
let mfCount;
let sfCount;
let gfCount;
let renderedD = true;
let renderedB;



const downArrowSection = document.querySelector('.down-arrow-section');
const mainResetButton = document.querySelector('.reset');
const undoButton = document.querySelector('.undo');
const defaultBoard = document.querySelector('.board-html');
const actionCountReset = document.querySelector('.action-count-reset');
const boardSwitchers = document.querySelectorAll('.next-button, .prev-button');
const bottomArrowSection = document.querySelector('.bottom-arrow-section');

playerAmountChoose();
mainReset();

function defaultBoardRender (){
  mainResetButton.classList.add('hidden');
  undoButton.classList.add('hidden');
  bottomArrowSection.classList.add('hidden');


  renderedD = true;
  renderedB = false;

  console.log(renderedB);
  console.log(renderedD);

  let startingBoard = `
  <div class="start-board">Choose player amount to display the board!<div>
  <div class="rules"></div>
  `;

  

  
  defaultBoard.innerHTML += startingBoard;
  boardSwitchers.forEach((button) => {
    button.classList.add('hidden');
  });
}

function playerAmountChoose (){
  const defaultAmounts = actionBoardData.map(item => item.amount);
  const playerSelect = document.querySelector('#player');

  playerSelect.addEventListener('change', () => {
    const selectedValue = parseInt(playerSelect.value, 10);
    const boardContainer = document.querySelector('.action-board-container');
    mainResetButton.classList.remove('hidden');

    actionBoardData.forEach((item, index) => {
      item.amount = defaultAmounts[index];

      if (selectedValue === 3) {
        item.amount -= 2;
      } else if (selectedValue === 4) {
        item.amount--;
      } else if (selectedValue === 5) {
        item.amount = defaultAmounts[index];
      } else if (selectedValue === 2) {
        item.amount -= 3;
      } 
    });

    if (selectedValue === 0) {
      boardContainer.classList.add('hidden');
      boardSwitchers.forEach((button) => {
        button.classList.add('hidden');
      });
      defaultBoardRender();
    } else {
      boardSwitchers.forEach((button) => {
        button.classList.remove('hidden');
      });
      renderActionBoard();
    }
  });
 defaultBoardRender(); 
}

function renderActionBoard() {

  if (actionHistory.length === 0 && activeButtonIndex === 0) {
    undoButton.classList.add('hidden');
  } 

  renderedD = false;
  renderedB = true;

  console.log(renderedB);
  console.log(renderedD);

  let boardHTML = document.querySelector('.board-html');
  let actionBoardHTML = '';
  let eventBoardHTML = '';
  let devotionBoardHTML = '';

  devotionBoardData.forEach((item) => {
    devotionBoardHTML += `
    <div class="devotion-board">
      <button id="${item.id}" class="event-button event-button-${item.styleLink.primary}" data-id="${item.id}">
        <img class="icon-button-style" src="${item.icon}" alt="">
      </button>
    </div>
    <img class="icon-button-play-event arrow-" src="./images/action-board/play.png" alt="">
    `
  })

  EventBoardData.forEach((item) => {
    eventBoardHTML += `
    <div class="event-board">
      <button id="${item.id}" class="event-button event-button-${item.styleLink.primary}" data-id="${item.id}">
        <img class="icon-button-style" src="${item.icon}" alt="">
      </button>
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
  <div class="devotion-board-container hidden">${devotionBoardHTML}</div>
  `;

  attachEventListeners();
  displayActionCount();
  mainReset();
}

function checkActionCount() {
  if (actionCount === 0) {
    displayMessage('Your Action Registered!', 1000);
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

  if (!(pattern in activeActionButtonIndices)) {
    activeActionButtonIndices[pattern] = 0;
  }

  let currentIndex = activeActionButtonIndices[pattern];

  actionButtons[currentIndex].classList.remove('on');

  currentIndex = (currentIndex + 1) % totalButtons;

  actionButtons[currentIndex].classList.add('on');

  actionButtons.forEach((button, index) => {
    button.disabled = (index !== currentIndex);
  });

  activeActionButtonIndices[pattern] = currentIndex;

  if (currentIndex === 0) {
    actionButtons[currentIndex + totalButtons].classList.add('opacity');
    setTimeout(() => {
      actionButtons[currentIndex + totalButtons].classList.remove('opacity');
    }, 4000);
    ResetActionCount();
    displayMessage('Current Action Row Reset!', 1000);
  }
}

function handleActionButtonClick(styleLink) {

  actionHistory.push({
    styleLink: styleLink,
    actionCount: actionCount,
    mfCount: mfCount,
    sfCount: sfCount,
    gfCount: gfCount,
    activeButtonIndex: activeButtonIndex,
    activeActionButtonIndices: {...activeActionButtonIndices} 
});

  mainResetButton.classList.remove('hidden');
  undoButton.classList.remove('hidden');

  if (styleLink === 'MF') {
    if (actionCount === 2) {
      renderActionCount();
      switchToNextActiontButton(styleLink);
      mfCount = 1;
    } else if (actionCount === 1) {
      displayMessage('In this round you can’t use this action anymore, please try another!', 3000);
    } else {
      displayMessage('Action Count Reset! Next Player!', 2000);
      ResetActionCount();
    }
  }

  if (styleLink === 'SF') {
    if (actionCount === 2 || (mfCount === 1 && actionCount > 0)) {
      sfCount = 1;
      renderActionCount();
      switchToNextActiontButton(styleLink);
      checkActionCount();
    } else if (sfCount === 1 && actionCount === 1 && actionCount > 0) {
      displayMessage('In this round you already used this move, please try another!', 3000);
    } else if (sfCount === 1 || actionCount === 1) {
      displayMessage('In this round you can’t use this action anymore, please try another!', 3000);
    }
  }

  if (styleLink === 'GF') {
    if (actionCount === 2 || (sfCount === 1 && actionCount > 0)) {
      gfCount = 1;
      renderActionCount();
      switchToNextActiontButton(styleLink);
      checkActionCount();
    } else if (actionCount === 2 || (mfCount === 1 && actionCount > 0)) {
      gfCount = 1;
      renderActionCount();
      switchToNextActiontButton(styleLink);
      checkActionCount();
    } else if (gfCount === 1 && actionCount < 2 && actionCount > 0) {
      displayMessage('In this round you already used this move, please try another!', 3000);
    } else {
      ResetActionCount();
    }
  }

  if (styleLink === 'UAP') {
    if (actionCount <= 2 && actionCount > 0) {
      renderActionCount();
      switchToNextActiontButton(styleLink);
      displayMessage('Your action Registered!', 1000);
      ResetActionCount();
    } else {
      displayMessage('No more actions', 1000);
    }
  }
}

function switchToNextButton(switchFormul) {

  const playerSelect = document.querySelector('#player');
  const selectedValue = parseInt(playerSelect.value, 10);

  const buttonData = EventBoardData;
  const eventButtons = document.querySelectorAll('.event-button');
  const totalButtons = eventButtons.length;
  mainResetButton.classList.remove('hidden');
  undoButton.classList.remove('hidden');

  eventButtons[activeButtonIndex].classList.remove('on');

  activeButtonIndex = (switchFormul) % totalButtons;

  eventButtons[activeButtonIndex].classList.add('on');

  eventButtons.forEach((button, index) => {
    button.disabled = (index !== activeButtonIndex);
  });

  console.log(activeButtonIndex);

  if (buttonData[activeButtonIndex].styleLink.primary === 'fan' && activeButtonIndex === 12 && selectedValue === 3) {
    displayMessage('Merge 2 Gods!', 1000)
  } else if (buttonData[activeButtonIndex].styleLink.primary === 'fan' && activeButtonIndex === 16) {
    displayMessage('Eliminate Gods in Red!', 1000)
  }

  if (activeButtonIndex === totalButtons - 1) {
    displayMessage('END OF THE MATCH', 1000);
  }
}

function toggleBoard() {
  const actionBoardContainer = document.querySelector('.action-board-container');
  const eventBoardContainer = document.querySelector('.event-board-container');
  const devotionBoardContainer = document.querySelector('.devotion-board-container');
  const downArrowSection = document.querySelector('.down-arrow-section');
  const bottomArrowSection = document.querySelector('.bottom-arrow-section');

  if (actionBoardContainer.classList.contains('hidden' ) && eventBoardContainer.classList.contains('hidden')) {
    actionBoardContainer.classList.remove('hidden');
    eventBoardContainer.classList.add('hidden');
    downArrowSection.classList.remove('hidden');
    devotionBoardContainer.classList.add('hidden');
    bottomArrowSection.classList.add('hidden');
    document.querySelector('.page-title').textContent = 'Action Board';
  } else if (eventBoardContainer.classList.contains('hidden')) {
    actionBoardContainer.classList.add('hidden');
    devotionBoardContainer.classList.add('hidden');
    eventBoardContainer.classList.remove('hidden');
    downArrowSection.classList.add('hidden');
    bottomArrowSection.classList.add('hidden');
    document.querySelector('.page-title').textContent = 'Event Board';
  } else if (devotionBoardContainer.classList.contains('hidden')){
    devotionBoardContainer.classList.remove('hidden');
    actionBoardContainer.classList.add('hidden');
    eventBoardContainer.classList.add('hidden');
    downArrowSection.classList.add('hidden');
    bottomArrowSection.classList.remove('hidden');
    document.querySelector('.page-title').textContent = 'Devotion Board';
  }
}

function attachEventListeners() {
  const buttons = document.querySelectorAll('.next-button, .prev-button');
  const eventButtons = document.querySelectorAll('.event-button');

  buttons.forEach(button => button.addEventListener('click', toggleBoard));

  if (eventButtons.length > 0) {
    eventButtons[activeButtonIndex].classList.add('on');
    eventButtons.forEach((button, index) => {
      button.disabled = (index !== activeButtonIndex);
    });
  }

  eventButtons.forEach(button => {
    button.addEventListener('click', () => {
      switchToNextButton(activeButtonIndex + 1);
    });
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

      actionButtons.forEach(button => {
        button.addEventListener('click', () => handleActionButtonClick(item.styleLink));
      });
    }
  });

  document.querySelector('.action-count-reset').addEventListener('click', () => {
    if (actionCount !== 2) {
      ResetActionCount();
    }
  });
}

function ResetActionCount (){
  mfCount = 0;
  sfCount = 0;
  gfCount = 0;
  actionCount = 2;
  actionCountReset.classList.add('hidden')
  displayActionCount();
  displayMessage('Action Count Reset! Next Playet Please!', 3000)
}

function displayActionCount () {
  document.querySelector('.actions-counter-monitor').innerHTML = actionCount;

  if (actionCount <2) {
    document.querySelector('.action-count-reset').classList.remove('hidden')
  } else {
    document.querySelector('.action-count-reset').classList.add('hidden')
  }
}

function renderActionCount (amount) {
  if (actionCount > 0 && actionCount <=3){
    actionCount --- amount;
  } else if (actionCount === 0) {
    displayMessage('no more actions', 1000)
    ResetActionCount();
  }
  
  displayActionCount();
}

function mainReset () { 
  mainResetButton.addEventListener('click', () => {
    activeButtonIndex = 0; 
    activeActionButtonIndices = {};
    actionCount = 2;
    mfCount;
    sfCount;
    gfCount;
    actionCountReset.classList.add('hidden')
    displayActionCount();
    toggleBoard();
    stopTimer();
    resetTimer();
    renderActionBoard();
    
    downArrowSection.classList.remove('hidden');

    if (renderedB = true && renderedD === false) {

      document.querySelector('.action-board-container').classList.add('hidden');
      boardSwitchers.forEach((button) => {
        button.classList.add('hidden');
      });
      const playerSelect = document.querySelector('#player');
      playerSelect.value = 0;
      defaultBoardRender();
    } 
    displayMessage('Board Reset!', 1000)
  })
}

function undoLastAction() {
  if (document.querySelector('.event-board-container').classList.contains('hidden')) {
    
    if (activeButtonIndex > 0 && actionHistory.length === 0){
      displayMessage('No action to undo! Try another Board!', 1500);
    }
    
  const lastAction = actionHistory.pop();

  actionCount = lastAction.actionCount;
  mfCount = lastAction.mfCount;
  sfCount = lastAction.sfCount;
  gfCount = lastAction.gfCount;
  activeButtonIndex = lastAction.activeButtonIndex;
  activeActionButtonIndices = lastAction.activeActionButtonIndices;


  renderActionBoard();
  displayActionCount();
  } else {
    if (activeButtonIndex > 0) {
      switchToNextButton(activeButtonIndex - 1);
      renderActionBoard();
      toggleBoard();
    } else if (activeButtonIndex === 0 && actionHistory.length > 0){
      displayMessage('No action to undo! Try another Board!', 1500);
    }
  }  
}

function displayMessage (messageText, timer) {
  const messageBox = document.querySelector('.blur');
  const message = document.querySelector('.message');

  message.textContent = messageText;
  
  messageBox.classList.remove('hidden');
  setTimeout(() => {
    messageBox.classList.add('hidden');
  }, timer);
}

undoButton.addEventListener('click', undoLastAction);


actionCountReset.addEventListener('click', () => {
  if (actionCount === 2) {
    return
  } else {
  ResetActionCount();
  }
})


renderActionCount();
displayActionCount();

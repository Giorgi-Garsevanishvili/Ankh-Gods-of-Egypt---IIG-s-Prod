import { actionBoardData, EventBoardData } from "../../data/action-board-data.js"

renderActionBoard();

export function renderActionBoard () {
  let boardHTML = document.querySelector('.board-html');
  let actionBoardHTML = '';
  let eventBoardHTML = '';

  EventBoardData.forEach((item) => {
    eventBoardHTML += `
    <div class="event-board">
      <div class="event-button event-button-${item.styleLink.primary}"><img class="icon-button-style" src="${item.icon}" alt=""></button></div>
    </div>
    <img class="icon-button-play-event arrow-${item.styleLink.secondary}" src="./images/action-board/play.png" alt="">
    `
  })

  actionBoardData.forEach((item) => {
    actionBoardHTML +=  `
    <div class="actions-board">
      <div class="action-square">
        <div class="figures">
          <div class="title-image"></div>
          <div class="title"><h5>${item.title}</h5></div>
          <div class="icon-items">

          <button class="icon-button icon-button-${item.styleLink}"><img class="icon-button-style" src="${item.icon}" alt=""></button>

          <img class="icon-button-play" src="./images/action-board/play.png" alt="">

          <button class="icon-button icon-button-${item.styleLink}"><img class="icon-button-style" src="${item.icon}" alt=""></button>

          <img class="icon-button-play" src="./images/action-board/play.png" alt="">

          <button class="icon-button icon-button-${item.styleLink}"><img class="icon-button-style" src="${item.icon}" alt=""></button>

          <img class="icon-button-play" src="./images/action-board/play.png" alt="">
          
          <button class="icon-button icon-button-${item.styleLink}"><img class="icon-button-style" src="${item.icon}" alt=""></button>

          <img class="icon-button-play" src="./images/action-board/play.png" alt="">

          <button class="icon-button icon-button-${item.styleLink}"><img class="icon-button-style" src="${item.icon}" alt=""></button>

          <img class="icon-button-play" src="./images/action-board/play.png" alt="">

          <button class="icon-button icon-button-${item.styleLink}"><img class="icon-button-style" src="${item.icon}" alt=""></button>

          <img class="icon-button-play" src="./images/action-board/play.png" alt="">
          
          <button class="icon-button icon-button-${item.styleLink} icon-button-last last-${item.styleLink}"><img class="icon-button-style icon-button-style " src="${item.icon}" alt=""></button>

          <img class="icon-button-play-${item.styleLink}" src="./images/action-board/play.png" alt="">
          </div>
        </div>
      </div>
     </div> 
    `;
  });

  boardHTML.innerHTML = `
  <div class="action-board-container">${actionBoardHTML}</div>
  <div class="event-board-container hidden">${eventBoardHTML}</div>
`;

const buttons = document.querySelectorAll('.next-button, .prev-button');

function toggleBoard() {
  const actionBoardContainer = document.querySelector('.action-board-container');
  const eventBoardContainer = document.querySelector('.event-board-container');
  const downArrowSection = document.querySelector('.down-arrow-section');
  
  if (actionBoardContainer.classList.contains('hidden')) {
    actionBoardContainer.classList.remove('hidden');
    eventBoardContainer.classList.add('hidden');
    downArrowSection.classList.remove('hidden')
    document.querySelector('.page-title').textContent = 'Action Board';
  } else {
    actionBoardContainer.classList.add('hidden');
    eventBoardContainer.classList.remove('hidden');
    downArrowSection.classList.add('hidden')
    document.querySelector('.page-title').textContent = 'Event Board';
  }
}
buttons.forEach(button => button.addEventListener('click', toggleBoard));
}




import { actionBoardData } from "../../data/action-board-data.js"

renderActionBoard();

export function renderActionBoard () {
  let boardHTML = document.querySelector('.action-square');
  let actionBoardHTML = '';
  let eventBoardHTML = `
    <div class="hello">Hello</Div>
  `;

  actionBoardData.forEach((item) => {
    actionBoardHTML +=  `
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
        
        <button class="icon-button icon-button-${item.styleLink} icon-button-last last-${item.styleLink}"><img class="icon-button-style" src="${item.icon}" alt=""></button>

        <img class="icon-button-play" src="./images/action-board/play.png" alt="">
        </div>
      </div>
    `;
  });

 boardHTML.innerHTML = actionBoardHTML;

  const buttons = document.querySelectorAll('.next-button, .prev-button');
  
  function toggleBoard () {
    if (boardHTML.innerHTML.includes('figures')) {
      boardHTML.innerHTML = eventBoardHTML;
      document.querySelector('.page-title').innerHTML = 'Event Board'
    }
    
    else if (boardHTML.innerHTML.includes('Hello')) {
      boardHTML.innerHTML = actionBoardHTML;
      document.querySelector('.page-title').innerHTML = 'Action Board'
    }
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      toggleBoard();
    })
  })
}




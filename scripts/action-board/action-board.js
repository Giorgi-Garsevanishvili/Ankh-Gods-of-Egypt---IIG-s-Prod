import { actionBoardData } from "../../data/action-board-data.js"

renderActionBoard();

export function renderActionBoard () {
  let actionBoardHTML = '';

  actionBoardData.forEach((item) => {
    actionBoardHTML +=  `
      <div class="figures">
        <div class="title"><h5>${item.title}</h5></div>
        <div class="icon-items">
        <button class="icon-button"><img class="icon-button-style" src="${item.icon}" alt=""></button>

        <img class="icon-button-play" src="./images/action-board/play.png" alt="">

        <button class="icon-button"><img class="icon-button-style" src="${item.icon}" alt=""></button>

        <img class="icon-button-play" src="./images/action-board/play.png" alt="">

        <button class="icon-button"><img class="icon-button-style" src="${item.icon}" alt=""></button>

        <img class="icon-button-play" src="./images/action-board/play.png" alt="">
        
        <button class="icon-button"><img class="icon-button-style" src="${item.icon}" alt=""></button>

        <img class="icon-button-play" src="./images/action-board/play.png" alt="">

        <button class="icon-button"><img class="icon-button-style" src="${item.icon}" alt=""></button>

        <img class="icon-button-play" src="./images/action-board/play.png" alt="">

        <button class="icon-button"><img class="icon-button-style" src="${item.icon}" alt=""></button>

        <img class="icon-button-play" src="./images/action-board/play.png" alt="">
        
        <button class="icon-button-last"><img class="icon-button-style" src="${item.icon}" alt=""></button>
        </div>
      </div>
    `;
  });

  document.querySelector('.action-square').innerHTML = actionBoardHTML;
}





import { actionBoardData } from "../../data/action-board-data.js"

renderActionBoard();

export function renderActionBoard () {
  let actionBoardHTML = '';

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

  document.querySelector('.action-square').innerHTML = actionBoardHTML;
}





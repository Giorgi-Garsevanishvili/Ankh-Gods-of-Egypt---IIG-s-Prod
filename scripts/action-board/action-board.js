import { actionBoarData } from "../../data/action-board-data"

renderActionBoard();

function renderActionBoard () {
  let actionBoarHTML = '';

  actionBoarData.forEach((item) => {
    actionBoarHTML +=  `
      <div class="figures">
        <div>
          <button>action</button>
        </div>
      </div>
    `;
  });
}


document.querySelector('.action-square').innerHTML = actionBoarHTML;

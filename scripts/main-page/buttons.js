import { buttonList } from "../../data/button-data.js";

renderButtonList();

function renderButtonList () {
  let buttonListHTML = '';

buttonList.forEach((button) => {
  buttonListHTML += `<div class="option-action-board">
      <div class="hover-box"><img class="js-hover-icon" src="./images/buttons/shen-ring.png" alt="" data-id="${button.id}"></div>
      <button class="action-board-button" data-id="${button.id}"><img class="action-board-icon" src="${button.image}" alt=""></button>
      <div class="button-title"><p>${button.text}</p></div>
    </div>`;
      
});

document.querySelector('.options-box-js').innerHTML = buttonListHTML;
}

document.querySelectorAll('.action-board-button').forEach(button => {

  button.addEventListener('mouseover', function() {
    const id = this.getAttribute('data-id');
    document.querySelector(`.js-hover-icon[data-id="${id}"]`).classList.add('hover-active');
  });

  button.addEventListener('mouseout', function() {
    const id = this.getAttribute('data-id');
    document.querySelector(`.js-hover-icon[data-id="${id}"]`).classList.remove('hover-active');
  });
});

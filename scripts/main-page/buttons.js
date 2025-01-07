import { buttonList } from "../../data/button-data.js";

renderButtonList();

function renderButtonList() {
  let buttonListHTML = "";

  buttonList.forEach((button) => {
    buttonListHTML += `<a href="${button.url}" class="option-action-board">
      <div class="hover-box"><img class="js-hover-icon js-hover-icon-${button.id}" alt="" data-id="${button.id}"></div>
      <button class="action-board-button" data-id="${button.id}"><img class="action-board-icon" src="${button.image}" alt=""></button>
      <div class="title button-title"><p>${button.text}</p></div>
    </a>`;
  });

  document.querySelector(".options-container").innerHTML = buttonListHTML;
}

document.querySelectorAll(".action-board-button").forEach((button) => {
  button.addEventListener("mouseover", function () {
    const id = this.getAttribute("data-id");

    // Remove non-hovered class from all buttons and titles
    document.querySelectorAll(".action-board-button").forEach((btn) => {
      btn.classList.remove("non-hovered");
    });
    document.querySelectorAll(".title").forEach((title) => {
      title.classList.remove("non-hovered-text");
    });

    // Add hover-active class to the hovered icon and options-box-active to options-box
    document
      .querySelector(`.js-hover-icon[data-id="${id}"]`)
      .classList.add("hover-active");
    document
      .querySelector(".options-box-js")
      .classList.add("options-box-active");

    // Apply non-hovered class to other buttons and titles
    document.querySelectorAll(".action-board-button").forEach((btn) => {
      if (btn !== this) {
        btn.classList.add("non-hovered");
      }
    });
    document.querySelectorAll(".title").forEach((title) => {
      if (
        title.closest(".option-action-board") !==
        this.closest(".option-action-board")
      ) {
        title.classList.add("non-hovered-text");
      }
    });
  });

  button.addEventListener("mouseout", function () {
    const id = this.getAttribute("data-id");

    // Remove hover-active class from all icons and options-box-active from options-box
    document
      .querySelector(`.js-hover-icon[data-id="${id}"]`)
      .classList.remove("hover-active");
    document
      .querySelector(".options-box-js")
      .classList.remove("options-box-active");

    // Remove non-hovered class from all buttons and titles
    document.querySelectorAll(".action-board-button").forEach((btn) => {
      btn.classList.remove("non-hovered");
    });
    document.querySelectorAll(".title").forEach((title) => {
      title.classList.remove("non-hovered-text");
    });
  });
});

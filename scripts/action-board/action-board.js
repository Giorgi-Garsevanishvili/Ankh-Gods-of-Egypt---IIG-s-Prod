import {
  actionBoardData,
  devotionBoardData1,
  devotionBoardData2,
  devotionBoardData3,
  devotionBoardData4,
  devotionBoardData5,
  EventBoardData,
  playerNameData1,
  playerNameData2,
  playerNameData3,
  playerNameData4,
  playerNameData5,
} from "../../data/action-board-data.js";
import { displayMessage } from "../../tools/display-message.js";
import { resetTimer, stopTimer } from "../timer.js";

let actionHistory = [];

let activeButtonIndex = 0;
let activeActionButtonIndices = {};
let actionCount = 3;
let mfCount;
let sfCount;
let gfCount;
let renderedD = true;
let renderedB;
let messageSend = false;
let data = [];
let selectedPlayer = null;
let playerName;

const downArrowSection = document.querySelector(".down-arrow-section");
const mainResetButton = document.querySelector(".reset");
const undoButton = document.querySelector(".undo");
const defaultBoard = document.querySelector(".board-html");
const devotionPlayerHTML = document.querySelector(".player-choose-buttons");
const actionCountReset = document.querySelector(".action-count-reset");
const boardSwitchers = document.querySelectorAll(".next-button, .prev-button");
const bottomArrowSection = document.querySelector(".bottom-arrow-section");
const boardSwitcher = document.querySelector(".board-switch-section");
const actionBoardButton = document.querySelector(".action-board-button");
const eventBoardButton = document.querySelector(".event-board-button");
const devotionBoardButton = document.querySelector(".devotion-board-button");
const sound = document.getElementById("notification-sound");
const audioButton = document.querySelector(".sound-button");
const selectPlayerAmount = document.getElementById("player");
const registerButton = document.querySelector(".player-name-register");
const playerNameRegister = document.querySelector(".player-name-register");
const updateNameButton = document.querySelector(".player-name-button");
const playerChooser = document.querySelector(".player-amount-chooser");
const playerName1 = document.querySelector(".player-name-input-1");
const playerName2 = document.querySelector(".player-name-input-2");
const playerName3 = document.querySelector(".player-name-input-3");
const playerName4 = document.querySelector(".player-name-input-4");
const playerName5 = document.querySelector(".player-name-input-5");
const playerInputs = [
  document.querySelector(".player-name-input-1"),
  document.querySelector(".player-name-input-2"),
  document.querySelector(".player-name-input-3"),
  document.querySelector(".player-name-input-4"),
  document.querySelector(".player-name-input-5"),
];

playerInputs[0].disabled = false;
playerInputs[1].disabled = false;

addPlayerName();
toggleSound("off");
playerAmountChoose();
renderDevotionPlayer();
updateInputs();
updateNames();
randomFactDisplay();

playerNameRegister.disabled = true;
playerName3.disabled = true;
playerName4.disabled = true;
playerName5.disabled = true;
mainResetButton.addEventListener("click", mainReset);
registerButton.addEventListener("click", () => {
  document.querySelector(".blur-player-name").classList.add("hidden");
});

playerInputs.forEach((input) => {
  input.addEventListener("input", updateInputs);
});

function randomFactDisplay() {
  document.querySelector(".facts-button").addEventListener("click", () => {
    fact();
  });
}

function updateNames() {
  updateNameButton.addEventListener("click", () => {
    document.querySelector(".blur-player-name").classList.remove("hidden");
    console.log(playerNameData1);

    registerButton.addEventListener("click", () => {
      if (playerName1.value) {
        playerNameData1[0].name = playerName1.value;
      } else {
        playerNameData1[0].name = "No Player";
      }

      if (playerName2.value) {
        playerNameData2[0].name = playerName2.value;
      } else {
        playerNameData2[0].name = "No Player";
      }

      if (playerName3.value) {
        playerNameData3[0].name = playerName3.value;
      } else {
        playerNameData3[0].name = "No Player";
      }

      if (playerName4.value) {
        playerNameData4[0].name = playerName4.value;
      } else {
        playerNameData4[0].name = "No Player";
      }

      if (playerName5.value) {
        playerNameData5[0].name = playerName5.value;
      } else {
        playerNameData5[0].name = "No Player";
      }

      document.querySelectorAll(".player-amount-chooser").forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.add("inactive");
      });

      document.querySelector(
        ".player-choose-title"
      ).innerHTML = `Choose Player`;

      if (
        document.querySelector(".player-choose-title").innerHTML ===
        "Choose Player"
      ) {
        document
          .querySelector(".default-devotion-message")
          .classList.remove("hidden");
        document.querySelector(".data-cont-dev").classList.add("hidden");
        document.querySelector(".dev-amount-display").classList.add("hidden");
      }

      document.querySelector(".blur-player-name").classList.add("hidden");
    });
  });
}

function renderDevotionPlayer() {
  let devotionPlayerSelect = `
  <button class="player-amount-chooser player-amount-chooser-1 inactive"><img class="chooser-image" src="./images/chooser-buttons-img/ankh (3).png" alt=""></button>
  <button class="player-amount-chooser player-amount-chooser-2 inactive"><img class="chooser-image" src="./images/chooser-buttons-img/ankh (4).png" alt=""></button>
  <button class="player-amount-chooser  player-amount-chooser-3 inactive"><img class="chooser-image" src="./images/chooser-buttons-img/ankh (5).png" alt=""></button>
  <button class="player-amount-chooser player-amount-chooser-4 inactive"><img class="chooser-image" src="./images/chooser-buttons-img/ankh (6).png" alt=""></button>
  <button class="player-amount-chooser  player-amount-chooser-5 inactive"><img class="chooser-image" src="./images/chooser-buttons-img/ankh (7).png" alt=""></button>`;

  devotionPlayerHTML.innerHTML += devotionPlayerSelect;
}

function defaultBoardRender() {
  mainResetButton.classList.add("hidden");
  undoButton.classList.add("hidden");
  bottomArrowSection.classList.add("hidden");

  renderedD = true;
  renderedB = false;

  let startingBoard = `
  <div class="start-board">Choose player amount to display the board!<div>
  <div class="rules"></div>
  `;

  defaultBoard.innerHTML += startingBoard;
  boardSwitchers.forEach((button) => {
    button.classList.add("hidden");
  });
  boardSwitcher.classList.add("hidden");
}

function updateInputs() {
  const firstInputFilled = playerInputs[0].value.trim();
  const secondInputFilled = playerInputs[1].value.trim();

  // If either 1st or 2nd input is empty, reset all subsequent inputs
  if (!firstInputFilled || !secondInputFilled) {
    for (let i = 2; i < playerInputs.length; i++) {
      const input = playerInputs[i];
      input.value = "";
      input.disabled = true;
      input.setAttribute("placeholder", `Player ${i + 1} - Unavailable`);
    }
    playerNameRegister.disabled = true;
    return; // Exit the function early
  }

  // If both 1st and 2nd inputs are filled, continue enabling subsequent inputs
  for (let i = 2; i < playerInputs.length; i++) {
    const currentInput = playerInputs[i - 1];
    const nextInput = playerInputs[i];

    if (currentInput.value.trim()) {
      nextInput.disabled = false;
      nextInput.setAttribute("placeholder", `Player ${i + 1} - Available`);
    } else {
      nextInput.value = "";
      nextInput.disabled = true;
      nextInput.setAttribute("placeholder", `Player ${i + 1} - Unavailable`);
    }
  }

  // Enable the register button if Player 1 and Player 2 are filled
  playerNameRegister.disabled = !(firstInputFilled && secondInputFilled);
}

function addPlayerName() {
  playerNameRegister.addEventListener("click", () => {
    if (playerName1.value) {
      playerNameData1.push({ name: playerName1.value });
    } else {
      playerNameData1.push({ name: "No Player" });
    }

    if (playerName2.value) {
      playerNameData2.push({ name: playerName2.value });
    } else {
      playerNameData2.push({ name: "No Player" });
    }

    if (playerName3.value) {
      playerNameData3.push({ name: playerName3.value });
    } else {
      playerNameData3.push({ name: "No Player" });
    }

    if (playerName4.value) {
      playerNameData4.push({ name: playerName4.value });
    } else {
      playerNameData4.push({ name: "No Player" });
    }

    if (playerName5.value) {
      playerNameData5.push({ name: playerName5.value });
    } else {
      playerNameData5.push({ name: "No Player" });
    }

    document.querySelector(".blur-player-name").classList.add("hidden");
    switchDevotionPlayer();
  });
}

function playerAmountChoose() {
  const defaultAmounts = actionBoardData.map((item) => item.amount);
  const playerSelect = document.querySelector("#player");

  playerSelect.addEventListener("change", () => {
    const selectedValue = parseInt(playerSelect.value, 10);
    const boardContainer = document.querySelector(".action-board-container");
    mainResetButton.classList.remove("hidden");

    actionBoardData.forEach((item, index) => {
      item.amount = defaultAmounts[index];

      // Code down below is simplify version of code which is commented below this one. idea and the logic is the same.
      // Define the states for each selectedValue
      const states = {
        2: { amount: -3, hidden: [3, 4, 5], visible: [1, 2] },
        3: { amount: -2, hidden: [5, 4], visible: [3, 2, 1] },
        4: { amount: -1, hidden: [5], visible: [4, 3, 2, 1] },
        5: { amount: "reset", hidden: [], visible: [5, 4, 3, 2, 1] },
      };

      // Apply changes based on the selected value
      if (states[selectedValue]) {
        const state = states[selectedValue];

        // Update amount
        if (state.amount === "reset") {
          item.amount = defaultAmounts[index];
        } else {
          item.amount += state.amount;
        }

        // Toggle visibility of elements
        [1, 2, 3, 4, 5].forEach((num) => {
          const selector = `.player-amount-chooser-${num}`;
          if (state.hidden.includes(num)) {
            document.querySelector(selector).classList.add("hidden");
          } else if (state.visible.includes(num)) {
            document.querySelector(selector).classList.remove("hidden");
          }
        });
      }
    });

    if (selectedValue === 0) {
      boardContainer.classList.add("hidden");
      boardSwitchers.forEach((button) => {
        button.classList.add("hidden");
      });
      boardSwitcher.classList.add("hidden");
      defaultBoardRender();
    } else {
      boardSwitchers.forEach((button) => {
        button.classList.remove("hidden");
      });
      boardSwitcher.classList.remove("hidden");
      renderActionBoard();
    }
  });
  switchDevotionPlayer();
  defaultBoardRender();
}

function renderActionBoard() {
  if (actionHistory.length === 0 && activeButtonIndex === 0) {
    undoButton.classList.add("hidden");
  }

  if (messageSend === false) {
    displayMessage("Welcome to the Game!", 3000, "no");
    messageSend = true;
  }

  renderedD = false;
  renderedB = true;

  let boardHTML = document.querySelector(".board-html");
  let actionBoardHTML = "";
  let eventBoardHTML = "";
  let devotionBoardHTML = "";

  data.forEach((item) => {
    devotionBoardHTML += `
    <div class="devotion-board">
      <button id="${item.id}" class="devotion-button event-button-${item.styleLink.primary}" data-id="${item.id}">
        <img class="icon-button-style" src="${item.icon}" alt="">
      </button>
    </div>
    <img class="icon-button-play-event arrow-" src="./images/action-board/play.png" alt="">
    `;
  });

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
            ${[...Array(item.amount)]
              .map(
                () => `
              <button class="icon-button icon-button-${item.styleLink}" data-id="${item.id}">
                <img class="icon-button-style" src="${item.icon}" alt="">
              </button>
              <img class="icon-button-play" src="./images/action-board/play.png" alt="">
            `
              )
              .join("")}
            <button class="icon-button icon-button-${
              item.styleLink
            } icon-button-last last-${item.styleLink}">
              <img class="icon-button-style" src="${item.icon}" alt="">
            </button>
            <img class="icon-button-play-${
              item.styleLink
            }" src="./images/action-board/play.png" alt="">
          </div>
        </div>
      </div>
    </div>`;
  });

  boardHTML.innerHTML = `
  <div class="action-board-container">${actionBoardHTML}</div>
  <div class="event-board-container hidden">${eventBoardHTML}</div>
  <div class="devotion-board-container hidden">
  <div class="default-devotion-message hidden">Please Select Player and enter devotion amount.</div>
  <div class="data-cont-dev">${devotionBoardHTML}</div>
  <div class="dev-amount-display"><p class="amount-dev">${data.length}</p></div>
  </div>

  `;

  selectPlayerAmount.disabled = true;

  if (selectPlayerAmount.disabled) {
    document.querySelector(".player-selector-style").classList.add("inactive");
    document.querySelector(".player-selector-style").classList.remove("active");
  }

  actionBoardButton.classList.add("visible");
  // playSound('on');
  toggleSound("on");
  renderDefaultMessage();
  attachEventListeners();
  displayActionCount();
  devotionFuntion();
  // mainReset();
  // Attach the event listener initially
  mainResetButton.addEventListener("click", mainReset);
  switchDevotionPlayer();
}

function switchDevotionPlayer() {
  document.querySelectorAll(".player-amount-chooser").forEach((button) => {
    button.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      document.querySelectorAll(".player-amount-chooser").forEach((btn) => {
        btn.classList.remove("active");
        btn.classList.add("inactive");
      });
      // Add 'active' class to the clicked button
      button.classList.add("active");
      button.classList.remove("inactive");
      document.querySelector(
        ".player-choose-title"
      ).innerHTML = `<h5 class="nameStyle">${playerName}'s</h5> Devotion Status`;
      dataStatus();
      renderDevotionBoard();
    });
  });
}

function renderDevotionBoard() {
  const devotionBoardContainer = document.querySelector(
    ".devotion-board-container"
  );
  let devotionBoardHTML = "";

  data.forEach((item) => {
    devotionBoardHTML += `
    <div class="devotion-board">
      <button id="${item.id}" class="devotion-button event-button-${item.styleLink.primary}" data-id="${item.id}">
        <img class="icon-button-style" src="${item.icon}" alt="">
      </button>
    </div>
    <img class="icon-button-play-event arrow-" src="./images/left-arrow.png" alt="">
    `;
  });

  devotionBoardContainer.innerHTML = `
    <div class="default-devotion-message">Please Select Player and enter devotion amount.</div>
    <div class="data-cont-dev">${devotionBoardHTML}</div>
    <div class="dev-amount-display"><p class="amount-dev">${data.length}</p></div>
  `;
  renderDefaultMessage();

  mainResetButton.addEventListener("click", mainReset);
}

function renderDefaultMessage() {
  if (data.length === 0) {
    document
      .querySelector(".default-devotion-message")
      .classList.remove("hidden");
    document.querySelector(".dev-amount-display").classList.add("hidden");
  } else {
    document.querySelector(".default-devotion-message").classList.add("hidden");
    document.querySelector(".dev-amount-display").classList.remove("hidden");
  }
}

function dataStatus() {
  const devotionPlayerSelect1 = document.querySelector(
    ".player-amount-chooser-1"
  );
  const devotionPlayerSelect2 = document.querySelector(
    ".player-amount-chooser-2"
  );
  const devotionPlayerSelect3 = document.querySelector(
    ".player-amount-chooser-3"
  );
  const devotionPlayerSelect4 = document.querySelector(
    ".player-amount-chooser-4"
  );
  const devotionPlayerSelect5 = document.querySelector(
    ".player-amount-chooser-5"
  );

  if (devotionPlayerSelect1.classList.contains("active")) {
    data = devotionBoardData1;
    selectedPlayer = devotionPlayerSelect1;
    playerName = playerNameData1[0].name;
    return { data, selectedPlayer, playerName };
  } else if (devotionPlayerSelect2.classList.contains("active")) {
    data = devotionBoardData2;
    selectedPlayer = devotionPlayerSelect2;
    playerName = playerNameData2[0].name;
    return { data, selectedPlayer, playerName };
  } else if (devotionPlayerSelect3.classList.contains("active")) {
    data = devotionBoardData3;
    selectedPlayer = devotionPlayerSelect3;
    playerName = playerNameData3[0].name;
    return { data, selectedPlayer, playerName };
  } else if (devotionPlayerSelect4.classList.contains("active")) {
    data = devotionBoardData4;
    selectedPlayer = devotionPlayerSelect4;
    playerName = playerNameData4[0].name;
    return { data, selectedPlayer, playerName };
  } else if (devotionPlayerSelect5.classList.contains("active")) {
    data = devotionBoardData5;
    selectedPlayer = devotionPlayerSelect5;
    playerName = playerNameData5[0].name;
    return { data, selectedPlayer, playerName };
  }
  renderActionBoard();
}

function devotionFuntion() {
  const devotionInput = document.querySelector(".devotion-input");

  document.querySelector(".decrease").addEventListener("click", () => {
    if (devotionInput.value) {
      const numEntries = parseInt(devotionInput.value, 10);

      if (
        data.length >= numEntries &&
        selectedPlayer.classList.contains("active")
      ) {
        // Remove from the end of the array
        data.splice(data.length - numEntries, numEntries);
        devotionInput.value = ""; // Clear input
        devotionInput.focus(); // Focus on input after clearing
        renderDevotionBoard(); // Render the updated board
      } else {
        devotionInput.value = ""; // Clear input
        devotionInput.focus(); // Focus on input after clearing
        renderDevotionBoard(); // Render the updated board
        displayMessage(
          `Not enough devotion to remove, you have ${data.length} Devotion!`,
          4000,
          "no"
        );
      }
    }
  });

  document.querySelector(".increase").addEventListener("click", () => {
    if (devotionInput.value) {
      // Convert devotionInput.value to a number (in case it's a string)
      const numEntries = parseInt(devotionInput.value, 10);

      if (selectedPlayer.classList.contains("active")) {
        const remainSpace = 32 - data.length;

        // Add the object to the array the specified number of times
        if (numEntries <= remainSpace) {
          for (let i = 0; i < numEntries; i++) {
            data.push({
              icon: "./images/action-board/fan.png",
              styleLink: {
                primary: "fan",
                secondary: "last",
              },
              id: i + data.length,
            });
          }
          devotionInput.value = "";
          devotionInput.focus();
          renderDevotionBoard();
        } else {
          displayMessage(
            `Maximum Devotion amount is 32, you have ${
              data.length
            }. Currently you can add only ${32 - data.length}`,
            5000,
            "no"
          );
          devotionInput.value = "";
          devotionInput.focus();
          renderDevotionBoard();
        }
      } else {
        displayMessage(
          "Please select an active player to add devotion!",
          4000,
          "no"
        );
        devotionInput.value = "";
        devotionInput.focus();
      }
    }
  });
}

function checkActionCount() {
  if (actionCount === 0) {
    displayMessage("Your Action Registered!", 1000, "no");
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
    console.log("No action buttons available");
    return;
  }

  if (!(pattern in activeActionButtonIndices)) {
    activeActionButtonIndices[pattern] = 0;
  }

  let currentIndex = activeActionButtonIndices[pattern];

  actionButtons[currentIndex].classList.remove("on");

  currentIndex = (currentIndex + 1) % totalButtons;

  actionButtons[currentIndex].classList.add("on");

  actionButtons.forEach((button, index) => {
    button.disabled = index !== currentIndex;
  });

  activeActionButtonIndices[pattern] = currentIndex;

  if (currentIndex === 0) {
    actionButtons[currentIndex + totalButtons].classList.add("opacity");
    setTimeout(() => {
      actionButtons[currentIndex + totalButtons].classList.remove("opacity");
    }, 4000);
    ResetActionCount();
    displayMessage("Current Action Row Reset!", 1000, "no");
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
    activeActionButtonIndices: { ...activeActionButtonIndices },
  });

  mainResetButton.classList.remove("hidden");
  undoButton.classList.remove("hidden");

  if (styleLink === "MF") {
    if (actionCount === 2) {
      renderActionCount();
      switchToNextActiontButton(styleLink);
      mfCount = 1;
    } else if (actionCount === 1) {
      displayMessage(
        "In this round you can’t use this action anymore, please try another!",
        3000,
        "no"
      );
    } else {
      displayMessage("Action Count Reset! Next Player!", 2000, "no");
      ResetActionCount();
    }
  }

  if (styleLink === "SF") {
    if (actionCount === 2 || (mfCount === 1 && actionCount > 0)) {
      sfCount = 1;
      renderActionCount();
      switchToNextActiontButton(styleLink);
      checkActionCount();
    } else if (sfCount === 1 && actionCount === 1 && actionCount > 0) {
      displayMessage(
        "In this round you already used this move, please try another!",
        3000,
        "no"
      );
    } else if (sfCount === 1 || actionCount === 1) {
      displayMessage(
        "In this round you can’t use this action anymore, please try another!",
        3000,
        "no"
      );
    }
  }

  if (styleLink === "GF") {
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
      displayMessage(
        "In this round you already used this move, please try another!",
        3000,
        "no"
      );
    } else {
      ResetActionCount();
    }
  }

  if (styleLink === "UAP") {
    if (actionCount <= 2 && actionCount > 0) {
      renderActionCount();
      switchToNextActiontButton(styleLink);
      displayMessage("Your action Registered!", 1000, "no");
      ResetActionCount();
    } else {
      displayMessage("No more actions", 1000, "no");
    }
  }
}

function switchToNextButton(switchFormul) {
  const playerSelect = document.querySelector("#player");
  const selectedValue = parseInt(playerSelect.value, 10);

  const buttonData = EventBoardData;
  const eventButtons = document.querySelectorAll(".event-button");
  const totalButtons = eventButtons.length;
  mainResetButton.classList.remove("hidden");
  undoButton.classList.remove("hidden");

  eventButtons[activeButtonIndex].classList.remove("on");

  activeButtonIndex = switchFormul % totalButtons;

  eventButtons[activeButtonIndex].classList.add("on");

  eventButtons.forEach((button, index) => {
    button.disabled = index !== activeButtonIndex;
  });

  if (
    buttonData[activeButtonIndex].styleLink.primary === "fan" &&
    activeButtonIndex === 12 &&
    selectedValue === 3
  ) {
    displayMessage("Merge 2 Gods!", 1000, "no");
  } else if (
    buttonData[activeButtonIndex].styleLink.primary === "fan" &&
    activeButtonIndex === 16
  ) {
    displayMessage("Eliminate Gods in Red!", 1000, "no");
  }

  if (activeButtonIndex === totalButtons - 1) {
    displayMessage("END OF THE MATCH", 1000, "no");
  }
}

function toggleBoard() {
  const actionBoardContainer = document.querySelector(
    ".action-board-container"
  );
  const eventBoardContainer = document.querySelector(".event-board-container");
  const devotionBoardContainer = document.querySelector(
    ".devotion-board-container"
  );
  const downArrowSection = document.querySelector(".down-arrow-section");
  const bottomArrowSection = document.querySelector(".bottom-arrow-section");

  if (
    actionBoardContainer.classList.contains("hidden") &&
    eventBoardContainer.classList.contains("hidden")
  ) {
    actionBoardContainer.classList.remove("hidden");
    downArrowSection.classList.remove("hidden");
    eventBoardContainer.classList.add("hidden");
    devotionBoardContainer.classList.add("hidden");
    bottomArrowSection.classList.add("hidden");
    actionBoardButton.classList.add("visible");
    eventBoardButton.classList.remove("visible");
    devotionBoardButton.classList.remove("visible");
    document.querySelector(".page-title").textContent = "Action Board";
  } else if (
    eventBoardContainer.classList.contains("hidden") &&
    devotionBoardContainer.classList.contains("hidden")
  ) {
    actionBoardContainer.classList.add("hidden");
    devotionBoardContainer.classList.add("hidden");
    eventBoardContainer.classList.remove("hidden");
    downArrowSection.classList.add("hidden");
    bottomArrowSection.classList.add("hidden");
    actionBoardButton.classList.remove("visible");
    eventBoardButton.classList.add("visible");
    devotionBoardButton.classList.remove("visible");
    document.querySelector(".page-title").textContent = "Event Board";
  } else if (
    devotionBoardContainer.classList.contains("hidden") &&
    actionBoardContainer.classList.contains("hidden")
  ) {
    devotionBoardContainer.classList.remove("hidden");
    actionBoardContainer.classList.add("hidden");
    eventBoardContainer.classList.add("hidden");
    downArrowSection.classList.add("hidden");
    bottomArrowSection.classList.remove("hidden");
    actionBoardButton.classList.remove("visible");
    eventBoardButton.classList.remove("visible");
    devotionBoardButton.classList.add("visible");
    document.querySelector(".page-title").textContent = "Devotion Board";
  }

  attachEventListeners();
}

function toggleSound(status) {
  const isOn = status === "on";

  sound[isOn ? "play" : "pause"](); // Play or pause based on the status
  sound.loop = isOn;
  sound.volume = isOn ? 0.2 : 0; // Volume only relevant when playing

  audioButton.innerHTML = isOn
    ? '<img class="sound-img-pause" src="./sound-efects/volume.png" alt="">'
    : '<img class="sound-img" src="./sound-efects/mute.png" alt="">';

  audioButton.addEventListener("click", () => {
    toggleSound(isOn ? "off" : "on"); // Toggle between 'on' and 'off'
  });
}

function attachEventListeners() {
  const buttons = document.querySelectorAll(".next-button");
  const eventButtons = document.querySelectorAll(".event-button");

  buttons.forEach((button) => button.addEventListener("click", toggleBoard));

  const actionBoardContainer = document.querySelector(
    ".action-board-container"
  );
  const eventBoardContainer = document.querySelector(".event-board-container");
  const devotionBoardContainer = document.querySelector(
    ".devotion-board-container"
  );
  const downArrowSection = document.querySelector(".down-arrow-section");
  const bottomArrowSection = document.querySelector(".bottom-arrow-section");
  const actionBoardButton = document.querySelector(".action-board-button");
  const eventBoardButton = document.querySelector(".event-board-button");
  const devotionBoardButton = document.querySelector(".devotion-board-button");

  document
    .querySelector(".action-board-button")
    .addEventListener("click", () => {
      actionBoardContainer.classList.remove("hidden");
      downArrowSection.classList.remove("hidden");
      eventBoardContainer.classList.add("hidden");
      devotionBoardContainer.classList.add("hidden");
      bottomArrowSection.classList.add("hidden");
      actionBoardButton.classList.add("visible");
      eventBoardButton.classList.remove("visible");
      devotionBoardButton.classList.remove("visible");
      document.querySelector(".page-title").textContent = "Action Board";
    });

  document
    .querySelector(".event-board-button")
    .addEventListener("click", () => {
      actionBoardContainer.classList.add("hidden");
      devotionBoardContainer.classList.add("hidden");
      eventBoardContainer.classList.remove("hidden");
      downArrowSection.classList.add("hidden");
      bottomArrowSection.classList.add("hidden");
      actionBoardButton.classList.remove("visible");
      devotionBoardButton.classList.remove("visible");
      eventBoardButton.classList.add("visible");
      document.querySelector(".page-title").textContent = "Event Board";
    });

  document
    .querySelector(".devotion-board-button")
    .addEventListener("click", () => {
      actionBoardContainer.classList.add("hidden");
      devotionBoardContainer.classList.remove("hidden");
      eventBoardContainer.classList.add("hidden");
      downArrowSection.classList.add("hidden");
      bottomArrowSection.classList.remove("hidden");
      actionBoardButton.classList.remove("visible");
      devotionBoardButton.classList.add("visible");
      eventBoardButton.classList.remove("visible");
      document.querySelector(".page-title").textContent = "Devotion Board";
    });

  if (eventButtons.length > 0) {
    eventButtons[activeButtonIndex].classList.add("on");
    eventButtons.forEach((button, index) => {
      button.disabled = index !== activeButtonIndex;
    });
  }

  eventButtons.forEach((button) => {
    button.addEventListener("click", () => {
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
      actionButtons[currentIndex].classList.add("on");
      actionButtons.forEach((button, index) => {
        button.disabled = index !== currentIndex;
      });

      actionButtons.forEach((button) => {
        button.addEventListener("click", () =>
          handleActionButtonClick(item.styleLink)
        );
      });
    }
  });

  document
    .querySelector(".action-count-reset")
    .addEventListener("click", () => {
      if (actionCount !== 2) {
        ResetActionCount();
      }
    });
}

function ResetActionCount() {
  mfCount = 0;
  sfCount = 0;
  gfCount = 0;
  actionCount = 2;
  actionCountReset.classList.add("hidden");
  displayActionCount();
  displayMessage("Action Count Reset! Next Player Please!", 3000, "no");
}

function displayActionCount() {
  document.querySelector(".actions-counter-monitor").innerHTML = actionCount;

  if (actionCount < 2) {
    document.querySelector(".action-count-reset").classList.remove("hidden");
  } else {
    document.querySelector(".action-count-reset").classList.add("hidden");
  }
}

function renderActionCount(amount) {
  if (actionCount > 0 && actionCount <= 3) {
    actionCount-- - amount;
  } else if (actionCount === 0) {
    displayMessage("no more actions", 1000, "no");
    ResetActionCount();
  }

  displayActionCount();
}

function mainReset() {
  // Remove event listeners if necessary
  mainResetButton.removeEventListener("click", mainReset);

  // Reset player selection
  if (selectedPlayer) {
    selectedPlayer.classList.remove("active");
    selectedPlayer.classList.add("inactive");
  }

  // Clear data arrays
  data.length = 0;
  devotionBoardData1.length = 0;
  devotionBoardData2.length = 0;
  devotionBoardData3.length = 0;
  devotionBoardData4.length = 0;
  devotionBoardData5.length = 0;

  // Reset action counts
  actionCount = 2;
  mfCount = 0;
  sfCount = 0;
  gfCount = 0;
  activeButtonIndex = 0;
  activeActionButtonIndices = {};
  selectedPlayer = null;

  // Hide reset button
  actionCountReset.classList.add("hidden");

  // Update action count display
  displayActionCount();

  // Toggle board and reset timer
  toggleBoard();
  stopTimer();
  resetTimer();

  // Render action board
  renderActionBoard();

  // Toggle sound
  toggleSound("off");
  messageSend = false;

  // Show down arrow section
  downArrowSection.classList.remove("hidden");

  // Check rendered states and update DOM accordingly
  if (renderedB === true && renderedD === false) {
    document.querySelector(".action-board-container").classList.add("hidden");
    boardSwitchers.forEach((button) => {
      button.classList.add("hidden");
    });
    boardSwitcher.classList.add("hidden");
    const playerSelect = document.querySelector("#player");
    playerSelect.value = 0;
    defaultBoardRender();
  }

  document.querySelector(".player-choose-title").innerHTML = `Choose Player`;

  selectPlayerAmount.disabled = false;
  if (!selectPlayerAmount.disabled) {
    document.querySelector(".player-selector-style").classList.add("active");
    document
      .querySelector(".player-selector-style")
      .classList.remove("inactive");
  }

  // Display reset message
  displayMessage("Board Reset!", 2000, "no");

  // Re-attach event listener

  mainResetButton.addEventListener("click", mainReset);
}

function undoLastAction() {
  if (
    document
      .querySelector(".event-board-container")
      .classList.contains("hidden")
  ) {
    if (activeButtonIndex > 0 && actionHistory.length === 0) {
      displayMessage("No action to undo! Try another Board!", 1500, "no");
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
    } else if (activeButtonIndex === 0 && actionHistory.length > 0) {
      displayMessage("No action to undo! Try another Board!", 1500, "no");
    }
  }
}

undoButton.addEventListener("click", undoLastAction);

actionCountReset.addEventListener("click", () => {
  if (actionCount === 2) {
    return;
  } else {
    ResetActionCount();
  }
});

async function fact() {
  const request = new Request(
    " https://uselessfacts.jsph.pl/api/v2/facts/random?language=en",
    {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    }
  );
  const response = await fetch(request);
  const data = await response.json();
  const fact = data.text;
  displayMessage(fact, 2147483647, "yes");
}

renderActionCount();
displayActionCount();

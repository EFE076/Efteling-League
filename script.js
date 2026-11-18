const menuButtons = [...document.querySelectorAll(".menu-option")];
const dialog = document.querySelector("#dialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogText = document.querySelector("#dialogText");
const dialogConfirm = document.querySelector("#dialogConfirm");
const dialogClose = document.querySelector("#dialogClose");

let selectedIndex = 0;
let previousAction = "new-game";

function updateSelection() {
  menuButtons.forEach((button, index) => {
    button.classList.toggle("selected", index === selectedIndex);
  });
}

function openDialog(title, message, confirmLabel = "Verder") {
  dialogTitle.textContent = title;
  dialogText.textContent = message;
  dialogConfirm.textContent = confirmLabel;
  dialog.classList.remove("hidden");
  dialogClose.focus();
}

function closeDialog() {
  dialog.classList.add("hidden");
  menuButtons[selectedIndex].focus();
}

function activateSelected() {
  const button = menuButtons[selectedIndex];
  if (!button || button.disabled) return;

  previousAction = button.dataset.action;
  if (previousAction === "new-game") {
    openDialog(
      "Nieuw avontuur",
      "Welkom in de Efteling-regio! De volgende stap is het maken van je trainer en het kiezen van je eerste Pokémon.",
      "Start binnenkort"
    );
  } else if (previousAction === "options") {
    openDialog(
      "Options",
      "Instellingen komen hier later. Dit startscherm gebruikt voorlopig de standaardinstellingen.",
      "Begrepen"
    );
  }
}

menuButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (button.disabled) return;
    selectedIndex = index;
    updateSelection();
    activateSelected();
  });
});

document.addEventListener("keydown", (event) => {
  if (!dialog.classList.contains("hidden")) {
    if (event.key === "Escape") closeDialog();
    return;
  }

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    let next = selectedIndex;
    do {
      next = (next + direction + menuButtons.length) % menuButtons.length;
    } while (menuButtons[next].disabled);
    selectedIndex = next;
    updateSelection();
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    activateSelected();
  }
});

dialogClose.addEventListener("click", closeDialog);
dialogConfirm.addEventListener("click", () => {
  if (previousAction === "new-game") {
    dialogTitle.textContent = "Wordt vervolgd...";
    dialogText.textContent = "Het startmenu werkt. Hierna bouwen we het personage- en starterselectiescherm.";
    dialogConfirm.textContent = "Terug naar menu";
    previousAction = "message";
  } else {
    closeDialog();
  }
});

updateSelection();
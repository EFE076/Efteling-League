const challengeButton = document.querySelector("#challenge-button");
const dialog = document.querySelector("#intro-dialog");
const closeButton = document.querySelector("#dialog-close");

challengeButton.addEventListener("click", () => {
  dialog.classList.remove("hidden");
  closeButton.focus();
});

closeButton.addEventListener("click", () => {
  dialog.classList.add("hidden");
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.classList.add("hidden");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") dialog.classList.add("hidden");
});

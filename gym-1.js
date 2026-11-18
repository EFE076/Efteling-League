const intro = document.querySelector("#intro-screen");
const battle = document.querySelector("#battle-screen");
const result = document.querySelector("#result-screen");
const message = document.querySelector("#battle-message");
const nextButton = document.querySelector("#next-turn");
const turnLabel = document.querySelector("#turn-label");

const enemies = [
  {name:"Geodude",level:12,hp:42,maxHp:42,image:"74.webp",moves:["Rock Throw","Tackle","Defense Curl","Rock Polish"]},
  {name:"Rockruff",level:14,hp:48,maxHp:48,image:"744.png",moves:["Rock Throw","Tackle","Leer","Sand Attack"]}
];
const player = {name:"Bulbasaur",level:12,hp:48,maxHp:48,image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"};
let enemyIndex = 0;
let playerTurn = true;

const enemyName = document.querySelector("#enemy-name");
const enemyLevel = document.querySelector("#enemy-level");
const enemyHp = document.querySelector("#enemy-hp");
const enemyHpText = document.querySelector("#enemy-hp-text");
const enemySprite = document.querySelector("#enemy-sprite");
const playerHp = document.querySelector("#player-hp");
const playerHpText = document.querySelector("#player-hp-text");
const moveGrid = document.querySelector("#move-grid");

function updateBars(){
  const enemy = enemies[enemyIndex];
  enemyHp.style.width = (enemy.hp / enemy.maxHp * 100) + "%";
  enemyHpText.textContent = "HP " + enemy.hp + " / " + enemy.maxHp;
  playerHp.style.width = (player.hp / player.maxHp * 100) + "%";
  playerHpText.textContent = "HP " + player.hp + " / " + player.maxHp;
}
function loadEnemy(){
  const enemy = enemies[enemyIndex];
  enemyName.textContent = enemy.name;
  enemyLevel.textContent = "Lv. " + enemy.level;
  enemySprite.src = enemy.image;
  enemySprite.alt = enemy.name;
  document.querySelector("#battle-step").textContent = "GEVECHT " + (enemyIndex + 1) + " / 2";
  updateBars();
}
function endBattle(won){
  battle.classList.add("hidden");
  result.classList.remove("hidden");
  document.querySelector("#result-title").textContent = won ? "JE HEBT GEWONNEN!" : "GEVECHT VERLOREN";
  document.querySelector("#result-text").textContent = won
    ? "Hoogmoed knikt. “Je hebt bewezen dat je sterker bent dan ik dacht. Deze badge is van jou.”"
    : "Hoogmoed: “Kom terug wanneer je team er klaar voor is.”";
  document.querySelectorAll(".reward-row").forEach(row => row.style.display = won ? "flex" : "none");
}
document.querySelector("#enter-gym").addEventListener("click", () => {
  intro.classList.add("hidden");
  battle.classList.remove("hidden");
  loadEnemy();
  message.textContent = "Hoogmoed: “Geodude, laat zien hoe sterk steen kan zijn!”";
});
moveGrid.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button || !playerTurn) return;
  playerTurn = false;
  const enemy = enemies[enemyIndex];
  const move = button.dataset.move;
  const damage = move === "Razor Leaf" || move === "Vine Whip" ? 22 : move === "Tackle" ? 12 : 8;
  enemy.hp = Math.max(0, enemy.hp - damage);
  message.textContent = player.name + " gebruikte " + move + "! " + enemy.name + " verloor " + damage + " HP.";
  updateBars();
  moveGrid.querySelectorAll("button").forEach(item => item.disabled = true);
  if(enemy.hp <= 0){
    if(enemyIndex === 0){
      message.textContent += " Geodude is verslagen! Hoogmoed stuurt zijn Rockruff naar voren.";
      nextButton.classList.remove("hidden");
      turnLabel.textContent = "NIEUWE TEGENSTANDER";
    } else {
      endBattle(true);
    }
    return;
  }
  setTimeout(() => {
    const counter = enemy.name === "Rockruff" ? 10 : 8;
    player.hp = Math.max(0, player.hp - counter);
    message.textContent += " " + enemy.name + " valt terug aan en doet " + counter + " schade.";
    updateBars();
    if(player.hp <= 0){ endBattle(false); return; }
    playerTurn = true;
    moveGrid.querySelectorAll("button").forEach(item => item.disabled = false);
    message.textContent += " Wat is je volgende zet?";
  },650);
});
nextButton.addEventListener("click", () => {
  enemyIndex = 1;
  nextButton.classList.add("hidden");
  turnLabel.textContent = "WAT DOE JE?";
  playerTurn = true;
  loadEnemy();
  moveGrid.querySelectorAll("button").forEach(item => item.disabled = false);
  message.textContent = "Hoogmoed stuurde Rockruff in! Dit is zijn sterkste Pokémon.";
});

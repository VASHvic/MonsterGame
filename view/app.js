import {
  Hero,
  Monster,
  generateMonsterNumberOfEnemies,
  createArrayOfMonsters,
} from "../bussines-logic/charachterLogic.js";

import { showRoundStatus } from "../bussines-logic/gameLogic.js";

//Game starts
let questionName = prompt("Hello champion! What is your name?");
const player = new Hero(questionName || "Anonymous"); //ask name + create hero
let pattern = /^[A-Z]+$/;

//prettier-ignore
const [...monsterArray] = createArrayOfMonsters(generateMonsterNumberOfEnemies());

console.log(
  `Carefull ${player.name}! ${monsterArray.length} monsters appeared!`
);

monsterArray.forEach((monster) => {
  monster.name =
    prompt(
      `Do you want to change the name of ${monster.name}?`,
      monster.name
    ) || monster.name;
});

//Game loop
while (monsterArray[0]) {
  console.log(
    `Fighting against ${monsterArray[monsterArray.length - 1].name}!`
  );
  const action = prompt("Choose your next action: A to atack - H to heal", "A");
  switch (action) {
    case "A":
    case "a":
      let heroDmg = player.attack();
      monsterArray[monsterArray.length - 1].health -= heroDmg;
      //monster dies
      if (monsterArray[monsterArray.length - 1].health <= 0) {
        showRoundStatus(player, monsterArray, heroDmg);
        console.log(`${monsterArray[monsterArray.length - 1].name} dies!`);
        const actualMonster = monsterArray.pop();
        break;
      } else {
        let monsterDmg = monsterArray[monsterArray.length - 1].attack();
        player.health -= monsterDmg;
        player.health < 1
          ? monsterArray.shift() //ends the loop
          : showRoundStatus(player, monsterArray, heroDmg, monsterDmg);
      }
      break;
    case "H":
    case "h":
      if (player.potions > 0) {
        player.drink();
        const monsterDmg = monsterArray[monsterArray.length - 1].attack();
        player.health -= monsterDmg;
        showRoundStatus(player, monsterArray, 0, monsterDmg);
      } else {
        console.log("You dont have enought potions!");
      }

      break;
    default:
      break;
  }
}

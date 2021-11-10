import {
  hero,
  monster,
  generateMonsterNumberOfEnemies,
  createArrayOfMonsters,
} from "../bussines-logic/charachterLogic.js";

import { status } from "../bussines-logic/gameLogic.js";

//loop functions
//prettier-ignore
/**
 *
 * @param {player object} p
 * @param {hero damage variable} hdmg
 * @param {monser damage variable} mdmg
 * @param {monster array} arr
 */
const showRoundStatus = (p, arr, hdmg = 0, mdmg = 0) => {
    console.log(`Round status: 
                ${p.name} - D: ${hdmg} , H: ${p.health}, P: ${p.potions}
                There is still ${arr.lenth} monsters alive!
                ${arr[arr.length - 1].name} - D: ${mdmg}, H: ${arr[arr.length - 1].health}`);
            };

//Game starts
let questionName = prompt("Hello champion! What is your name?");
const player = new hero(questionName || "Anonymous");

const [...monsterArray] = createArrayOfMonsters(
  generateMonsterNumberOfEnemies()
);

console.log(
  `Carefull ${player.name}! ${monsterArray.length} monsters appeared!`
);

monsterArray.forEach((monster) => {
  monster.name = prompt(
    `Do you want to change the name of ${monster.name}?`,
    monster.name
  );
});

//Game loop
while (monsterArray[0]) {
  console.log(`Fighting against ${monsterArray[monsterArray.length - 1].name}`);
  const action = prompt("Choose your next action: A to atack - H to heal", "A");
  switch (action) {
    case "A":
    case "a":
      let heroDmg = player.attack();
      monsterArray[monsterArray.length - 1].health -= heroDmg;
      console.log(`player hits monster for ${heroDmg}`);
      //monster dies
      if (monsterArray[monsterArray.length - 1].health <= 0) {
        const actualMonster = monsterArray.pop();
        console.log(`monster dies`);
        showRoundStatus(player, monsterArray, heroDmg);
        break;
      } else {
        let monsterDmg = monsterArray[monsterArray.length - 1].attack();
        console.log(`mosnter hits player for ${monsterDmg}`);
        showRoundStatus(player, monsterArray, heroDmg, monsterDmg);
      }

      break;
    case "H":
    case "h":
      player.potions > 0
        ? (player.health += 70)
        : console.log("You dont have enought potions!");
      //heal of repeat action

      const monsterDmg = monsterArray[monsterArray.length - 1].attack();
      showRoundStatus(player, monsterArray, 0, monsterDmg);

      break;
    default:
      break;
  }
}

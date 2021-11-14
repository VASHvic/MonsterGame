import {
  generateMonsterNumberOfEnemies,
  createArrayOfMonsters,
  createHero,
  checkMonsterNames,
} from "../bussines-logic/charachterLogic.js";

import {
  showRoundStatus,
  status,
  resultOfGame,
} from "../bussines-logic/gameLogic.js";

//Game starts, create and check hero and monsters + add them into an array of objs
let player = createHero();
//prettier-ignore
const [...monsterArray] = createArrayOfMonsters(generateMonsterNumberOfEnemies());

//prettier-ignore
console.log(`Carefull ${player.name}! ${monsterArray.length} monsters appeared!`);

checkMonsterNames(monsterArray);

//Game loop starts
while (monsterArray[0]) {
  // saved the last monster of the stack for easier syntax
  let CURRENT_MONSTER = monsterArray[monsterArray.length - 1];
  console.log(`Fighting against ${CURRENT_MONSTER.name}!`);
  const action = prompt("Choose your next action: A to atack - H to heal", "A");
  switch (action) {
    case "A":
    case "a":
      CURRENT_MONSTER.loseHealth(player.attack());
      status.set("HeroNumOfAttacks", status.get("HeroNumOfAttacks") + 1);
      status.set("totalHeroDmg", status.get("totalHeroDmg") + player.lastDmg);
      //monster dies
      if (CURRENT_MONSTER.health <= 0) {
        CURRENT_MONSTER.health = 0;
        console.log(`${CURRENT_MONSTER.name} is dead!`);
        CURRENT_MONSTER.lastDmg = 0;
        monsterArray.pop();
        showRoundStatus(player, CURRENT_MONSTER, monsterArray);
        break;
      } else {
        // monster is alive and attacks
        player.loseHealth(CURRENT_MONSTER.attack());
        //prettier-ignore
        status.set("MonsterNumOfAttacks",status.get("MonsterNumOfAttacks") + 1);
        //check if player is alive
        player.health < 1
          ? monsterArray.shift() //ends the loop
          : showRoundStatus(player, CURRENT_MONSTER, monsterArray);
      }
      break;
    case "H":
    case "h":
      if (player.potions > 0) {
        player.drink();
        player.loseHealth(CURRENT_MONSTER.attack());
        showRoundStatus(player, CURRENT_MONSTER, monsterArray);
      } else {
        console.log("You dont have enought potions!");
      }

      break;
    case null:
      console.log("Running...");
      for (let i = monsterArray.length; i > 0; i--) {
        monsterArray.pop();
      }
      player.escapes = true;
    default:
      break;
  }
}

setTimeout(() => resultOfGame(player), 2000);

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
const CURRENT_MONSTER = monsterArray[monsterArray.length - 1];
//prettier-ignore
console.log(`Carefull ${player.name}! ${monsterArray.length} monsters appeared!`);

checkMonsterNames(monsterArray);

//Game loop starts
while (monsterArray[0]) {
  console.log(`Fighting against ${CURRENT_MONSTER.name}!`);
  const action = prompt("Choose your next action: A to atack - H to heal", "A");
  switch (action) {
    case "A":
    case "a":
      status.set("HeroNumOfAttacks", status.get("HeroNumOfAttacks") + 1);
      let heroDmg = player.attack();
      status.set("totalHeroDmg", status.get("totalHeroDmg") + heroDmg);
      CURRENT_MONSTER.health -= heroDmg;
      //monster dies
      if (CURRENT_MONSTER.health <= 0) {
        CURRENT_MONSTER.health = 0;
        console.log(`${CURRENT_MONSTER.name} is dead!`);
        showRoundStatus(player, monsterArray, heroDmg);
        monsterArray.pop();
        break;
      } else {
        let monsterDmg = CURRENT_MONSTER.attack();
        status.set(
          "MonsterNumOfAttacks",
          status.get("MonsterNumOfAttacks") + 1
        );
        player.health -= monsterDmg;
        //check if player is alive
        player.health < 1
          ? monsterArray.shift() //ends the loop
          : showRoundStatus(player, monsterArray, heroDmg, monsterDmg);
      }
      break;
    case "H":
    case "h":
      if (player.potions > 0) {
        player.drink();
        const monsterDmg = CURRENT_MONSTER.attack();
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

setTimeout(resultOfGame(player), 2000);

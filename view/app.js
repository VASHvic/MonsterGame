import {
  generateMonsterNumberOfEnemies,
  createArrayOfMonsters,
  createHero,
  checkMonsterNames,
  status,
} from "../bussines-logic/charachterLogic.js";

//function to show the game stats after each round
//prettier-ignore
/**
 *
 * @param {player object} p
 * @param {monster object} p
 * @param {monster array} arr
 */
const showRoundStatus = (hero, monster, arr) => {
  console.log(
    `Round status: 
                ${hero.name} - D: ${hero.lastDmg}, H: ${hero.health}, P: ${hero.potions}
                There is still ${arr.length } monsters alive!
                ${monster.name } - D: ${monster.lastDmg}, H: ${monster.health}`
  );
};

//Game starts, create and check hero and monsters + add them into an array of objs
let player = createHero();
//prettier-ignore
const monsterArray = createArrayOfMonsters(generateMonsterNumberOfEnemies());

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
        if (player.health < 1) {
          player.health = 0;
          monsterArray.length = 0; //ends the loop
        }
        showRoundStatus(player, CURRENT_MONSTER, monsterArray);
      }
      break;
    case "H":
    case "h":
      if (player.potions > 0) {
        player.drink();
        console.log(`${player.name} drinks a healing potion!`);
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

//chain of messages to show when the game ends
setTimeout(() => resultOfGame(player), 2000);

const resultOfGame = (player) => {
  if (player.escapes === true) {
    console.log(
      `${player["name"]} escapes and lives to fight another day \u{1F977}`
    );
  } else if (player.health > 0) {
    console.log(`Victory! ${player["name"]} defeated all monsters. \u{1F3C6}`);
  } else {
    console.log(`\u{2671} ${player["name"]} died \u{2671}`);
  }
  return setTimeout(() => showStats(status, player), 2000);
};

const showStats = (map, hero) => {
  console.log(`
  ***********************
      GAME STATISTICS
  ***********************
  Number of player atacks: ${map.get("HeroNumOfAttacks")}
  Number of monster atacks: ${map.get("MonsterNumOfAttacks")}
  Total damage made by ${hero.name}: ${map.get("totalHeroDmg")}
  Total damage made by the monsters: ${hero.getHpLost()}
  Total number of potions consumed: ${2 - hero.potions}`);
  return setTimeout(gameOverMsg, 2000);
};

const gameOverMsg = () => {
  console.log("GAME OVER");
};

import hero from "../bussines-logic/heroLogic.js";
import * as monsterlogic from "../bussines-logic/monsterLogic.js";

let questionName = prompt("Hello champion! What is your name?");
const player = new hero(questionName || "Anonymous");

const numberOfEnemies = monsterlogic.generateMonsterNumberOfEnemies();

console.log(`Carefull ${player.name}! ${numberOfEnemies} monsters appeared!`);

const [...monsterArray] = monsterlogic.createArrayOfMonsters(numberOfEnemies);

monsterArray.forEach((monster) => {
  monster.name = prompt(
    `Do you want to change the name of ${monster.name}?`,
    monster.name
  );
});

while (monsterArray[0]) {
  const action = prompt("Choose your next action: A to atack - H to heal", "A");
  switch (action) {
    case "A":
    case "a":
      console.log(
        (monsterArray[monsterArray.length - 1].health -= player.attack())
      );
      break;
    case "H":
    case "h":
      console.log("hero heals");
      break;
  }
}

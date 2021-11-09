import hero from "../bussines-logic/heroLogic.js";
import * as monsterlogic from "../bussines-logic/monsterLogic.js";

let questionName = prompt("Hello champion! What is your name?");
const player = new hero(questionName || "Anonymous");

const numberOfEnemies = monsterlogic.generateMonsterNumber();

const [...monsterArray] = monsterlogic.createArrayOfMonsters(numberOfEnemies);

console.log(`Carefull ${player.name}! ${numberOfEnemies} monsters appeared!`);

console.log(monsterArray);

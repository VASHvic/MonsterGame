import { controls } from "./config.js";

function Hero(name) {
  this.name = name;
  this.health = controls.heroHealth;
  this.potions = controls.heroPotions;
  this.lastDmg = 0;
  this.hpLost = [];
  this.escapes = false;
  //return and save dmg betwen max min
  this.attack = () => {
    this.lastDmg =
      Math.floor(Math.random() * (controls.heroMaxDmg - controls.heroMinDmg)) +
      controls.heroMinDmg;
    return this.lastDmg;
  };
  this.drink = function () {
    this.health += 70;
    this.potions--;
    if (this.health > 100) {
      this.health = 100;
    }
  };
  this.loseHealth = function (dmg) {
    this.health -= dmg;
    this.hpLost.push(dmg);
  };
  this.getHpLost = function () {
    return this.hpLost.reduce(function (a, b) {
      return a + b;
    }, 0);
  };
}

function Monster(name) {
  this.name = name;
  this.health = controls.monsterHealth;
  this.lastDmg = 0;
  this.attack = () => {
    this.lastDmg =
      Math.floor(
        Math.random() * (controls.monsterMaxDmg - controls.monsterMinDmg)
      ) + controls.monsterMinDmg;
    return this.lastDmg;
  };
  this.loseHealth = function (dmg) {
    this.health -= dmg;
  };
}

const status = new Map([
  ["HeroNumOfAttacks", 0],
  ["MonsterNumOfAttacks", 0],
  ["totalHeroDmg", 0],
]);

const checkPlayerName = (question) => {
  const heroPattern = /^[A-Z][A-Za-z]+$/;
  if (question === null || heroPattern.test(question) === true) {
    const player = new Hero(question || "Anonymous");
    return player;
  }
};

const generateMonsterNumberOfEnemies = () =>
  Math.floor(Math.random() * controls.maxMonsters) + controls.minMonsters;

const createArrayOfMonsters = (number) => {
  const monsterArray = [];
  for (let i = 1; i < number + 1; i++) {
    monsterArray.push(new Monster(`Monster${i}`));
  }
  return monsterArray;
};

function checkMonsterNames(arr, msg1, msg2) {
  arr.forEach((monster) => {
    const monsterPattern = /^[a-zA-Z]+[0-9]?$/;
    msg1(monster);
    while (monsterPattern.test(monster.name) === false) {
      msg2(monster);
    }
  });
}

export {
  Hero,
  Monster,
  status,
  checkPlayerName,
  generateMonsterNumberOfEnemies,
  createArrayOfMonsters,
  checkMonsterNames,
};

function Hero(name) {
  this.name = name;
  this.health = 100;
  this.potions = 2;
  this.attack = () => Math.floor(Math.random() * (20 - 10)) + 10;
  this.drink = function () {
    this.health += 70;
    this.potions--;
    if (this.health > 100) {
      this.health = 100;
    }
    console.log(`${this.name} drinks a healing potion!`);
  };
}

function Monster(name) {
  this.name = name;
  this.health = 100;
  this.attack = () => Math.floor(Math.random() * (20 - 10)) + 10;
}

const generateMonsterNumberOfEnemies = () => Math.floor(Math.random() * 3) + 1;

const createArrayOfMonsters = (number) => {
  const monsterArray = [];
  // for (let i = 0; i < number; i++) {
  monsterArray.push(new Monster(`Monster`)); //falta la i
  //  }
  return monsterArray;
};
function createHero() {
  const heroPattern = /^[A-Z][A-Za-z]+$/;
  while (true) {
    let questionName = prompt(
      `Hello champion! What is your name? Capitalize your name`,
      "Anonymous"
    );
    if (questionName === null || heroPattern.test(questionName) === true) {
      let player = new Hero(questionName || "Anonymous"); //preguntar
      return player;
    }
  }
}
function checkMonsterNames(arr) {
  arr.forEach((monster) => {
    const monsterPattern = /[a-zA-Z]+[0-9]?$/;
    monster.name =
      prompt(
        `Do you want to change the name of ${monster.name}?`,
        monster.name
      ) || monster.name;
    while (monsterPattern.test(monster.name) === false) {
      monster.name = prompt(
        `Choose a valid name for this monster Ex: Monster1 !`,
        monster.name
      );
    }
  });
}

export {
  Hero,
  Monster,
  generateMonsterNumberOfEnemies,
  createArrayOfMonsters,
  createHero,
  checkMonsterNames,
};

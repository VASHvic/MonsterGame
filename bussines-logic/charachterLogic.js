function Hero(name) {
  this.name = name;
  this.health = 100;
  this.potions = 2;
  this.attack = () => Math.floor(Math.random() * (20 - 10)) + 10;
  this.drink = function () {
    this.health += 70;
    this.potions--;
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
  for (let i = 0; i < number; i++) {
    monsterArray.push(new Monster(`Monster ${i + 1}`));
  }
  return monsterArray;
};

export { Hero, Monster, generateMonsterNumberOfEnemies, createArrayOfMonsters };

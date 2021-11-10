function hero(name) {
  this.name = name;
  this.health = 100;
  this.potions = 2;
  this.attack = () => Math.floor(Math.random() * (20 - 10)) + 10;
}
function monster(name) {
  this.name = name;
  this.health = 100;
  this.attack = () => Math.floor(Math.random() * (20 - 10)) + 10;
}

const generateMonsterNumberOfEnemies = () => Math.floor(Math.random() * 3) + 1;

const createArrayOfMonsters = (number) => {
  const monsterArray = [];
  for (let i = 0; i < number; i++) {
    monsterArray.push(new monster(`Monster ${i + 1}`));
  }
  return monsterArray;
};

export { hero, monster, generateMonsterNumberOfEnemies, createArrayOfMonsters };

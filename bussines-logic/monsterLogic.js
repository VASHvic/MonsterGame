function monster(name) {
  this.name = name;

  attack: () => Math.floor(Math.random() * 20);
}

const generateMonsterNumber = () => Math.floor(Math.random() * 4);

const createArrayOfMonsters = (number) => {
  const monsterArray = [];
  for (let i = 0; i < number; i++) {
    monsterArray.push(new monster(`Monster${i + 1}`));
  }
  return monsterArray;
};

export { monster, generateMonsterNumber, createArrayOfMonsters };

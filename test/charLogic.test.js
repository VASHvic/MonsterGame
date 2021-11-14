import * as character from "../bussines-logic/charachterLogic.js";

describe("Test Suite for Hero Object", () => {
  const hero = new character.Hero("Anonymous");
  it("Creates a hero with correct stats", () => {
    expect(hero).toHaveProperty("name", "Anonymous");
    expect(hero).toHaveProperty("health", 100);
    expect(hero).toHaveProperty("potions", 2);
  });
  test("Hero methods", () => {
    expect(hero.attack()).toBeGreaterThanOrEqual(10);
    expect(hero.attack()).toBeLessThan(21);
    hero.loseHealth(75);
    expect(hero).toHaveProperty("health", 25);
    hero.drink();
    expect(hero).toHaveProperty("health", 95);
  });
});

describe("Test Suite for the Monster Object", () => {
  const monster = new character.Monster("Monster");
  it("Creates a monster with correct stats", () => {
    expect(monster).toHaveProperty("name", "Monster");
    expect(monster).toHaveProperty("health", 100);
  });
  test("Monster methods", () => {
    const monster = new character.Monster("Monster");
    expect(monster.attack()).toBeGreaterThanOrEqual(10);
    expect(monster.attack()).toBeLessThan(21);
    monster.loseHealth(75);
    expect(monster).toHaveProperty("health", 25);
  });
});

describe("Test suit for generateMonsterNumberOfEnemies function", () => {
  it("returns a random number between 1 and 3", () => {
    //prettier-ignore
    expect(character.generateMonsterNumberOfEnemies()).toBeGreaterThanOrEqual(1);
    expect(character.generateMonsterNumberOfEnemies()).toBeLessThan(4);
  });
});

describe("Test suit for createArrayOfMonsters function", () => {
  it("returns an aray with the given number of monsters", () => {
    expect(character.createArrayOfMonsters(1)).toHaveLength(1);
    expect(character.createArrayOfMonsters(2)).toHaveLength(2);
    expect(character.createArrayOfMonsters(3)).toHaveLength(3);
  });
});

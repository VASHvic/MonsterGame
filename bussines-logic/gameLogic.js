const status = new Map([
  ["HeroNumOfAttacks", 0],
  ["MonsterNumOfAttacks", 0],
  ["totalHeroDmg", 0],
]);

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
const resultOfGame = (player) => {
  if (player.escapes === true) {
    console.log(
      `${player["name"]} escapes and lives to fight another day \u{1F977}`
    );
  } else if (player.health > 0) {
    console.log(`Victory! ${player["name"]} defeated all monsters. \u{1F3C6}`);
  } else {
    console.log(`\u{1F547} ${player["name"]} died \u{1F547}`);
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
export { status, showRoundStatus, gameOverMsg, resultOfGame, showStats };

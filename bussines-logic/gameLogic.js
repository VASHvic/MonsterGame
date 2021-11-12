const status = new Map([
  ["HeroNumOfAttacks", 0],
  ["MonsterNumOfAttacks", 0],
  ["totalHeroDmg", 0],
]);

//prettier-ignore
/**
 *
 * @param {player object} p
 * @param {hero damage variable} hdmg
 * @param {monser damage variable} mdmg
 * @param {monster array} arr
 */

const showRoundStatus = (p, arr, hdmg = 0, mdmg = 0) => {
  console.log(
    `Round status: 
                ${p.name} - D: ${hdmg}, H: ${p.health}, P: ${p.potions}
                There is still ${arr.length } monsters alive!
                ${arr[arr.length - 1].name } - D: ${mdmg}, H: ${arr[arr.length - 1].health}`
  );
};
const resultOfGame = (player) => {
  if (player.health > 0) {
    console.log(`Victory! ${player["name"]} defeated all monsters.`);
  } else {
    console.log(`${player["name"]} died`);
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
  Total damage made by the player: ${map.get("totalHeroDmg")}
  Total damage made by the monsters: ${240 - 70 * hero.potions - hero.health}
  Total number of potions consumed: ${2 - hero.potions}`);
  return setTimeout(gameOverMsg, 2000);
};

const gameOverMsg = () => {
  console.log("GAME OVER");
};
export { status, showRoundStatus, gameOverMsg, resultOfGame, showStats };

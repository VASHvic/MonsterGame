const status = {
  HeroNumOfAttacks: 0,
  totalHeroDmg: 0,
  totalHeroHeal: 0,
  MonsterNumOfAttacks: 0,
  totalMonsterDmg: 0,
};
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
                There is still ${arr.length} monsters alive!
                ${arr[arr.length - 1].name} - D: ${mdmg}, H: ${arr[arr.length - 1].health}`
  );
};
export { status, showRoundStatus };

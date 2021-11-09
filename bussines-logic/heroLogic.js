export default class hero {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.potions = 2;
  }

  attack = () => Math.floor(Math.random() * (20 - 10)) + 10;
}

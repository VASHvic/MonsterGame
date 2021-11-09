function hero(name) {
  this.name = name;

  attack: () => Math.floor(Math.random() * 20);
}

export default hero;

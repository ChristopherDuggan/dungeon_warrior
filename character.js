class Character {
  constructor(level, attributes, abilities, xp, inventory){
    this.level = level;
    this.attributes = attributes;
    this.xp = xp;
    this.inventory = inventory;
    this.hp = (level * 9) + attributes.toughness
  }
}

let testChar = new Character (1, {strength: 1, agility: 1, toughness: 1}, {attack: 1, block: 1, dodge: 1}, 50, ['sword'])

console.log(testChar)

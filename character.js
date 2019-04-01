class Character {
  constructor(level, attributes, abilities, xp, inventory){
    this.level = level;
    this.attributes = attributes;
    this.xp = xp;
    this.inventory = inventory;
    this.hp = (level * 9) + attributes.toughness
  }
}

let testChar = new Character (0, {strength: 1, agility: 1, toughness: 1}, {attack: 1, block: 1, dodge: 1}, 50, [{type: 'weapon', name: 'stick', damage: 1}, {type: 'potion', name: 'hp', damage: -9}])
testChar.xp = 0
console.log(testChar)

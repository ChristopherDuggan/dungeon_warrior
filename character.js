class Character {
  constructor(level, attributes, abilities, inventory){
    this.level = level;
    this.attributes = attributes;
    this.abilities = abilities;
    this.inventory = inventory;
    this.maxHp = (level * 9) + attributes.toughness;
    this.currentHp = this.maxHp;
    this.xp = 0;
    this.actionsPerTurn = Math.floor(level/10 + 2);
    this.weapon = null;
    this.armor = null;
  }
  showInventory() {

  }
  // equip(item) {
  //
  // }
  // attack() {
  //   console.log(this.weapon)
  // }
}

let testChar = new Character (1,
  {strength: 1, agility: 1, toughness: 1},
  {attack: 1, block: 1, dodge: 1},
  [{type: 'weapon', name: 'stick', damage: 1}, {}]);
testChar.xp = 0;


class Baddie extends Character {
  constructor(level, attributes, abilities, inventory,actionBias){
    super(level, attributes, abilities, inventory)
    this.xp = (level + 1) * 10;
    this.actions = Math.floor(level/10 + 1)
    this.actionBias = actionBias;
  }
}

// let bob = new Baddie (1, 'some attributes', 'some abilites', 'some inventory', 'an action bias')
// console.log(bob);
//fixed error where attributes weren't included
//set default xp to 0

// testChar.equip('stick');

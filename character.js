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
    this.potionArr = this.getInventoryArr('health potion');
    this.weaponArr = this.getInventoryArr('weapon');
    this.armorArr = this.getInventoryArr('armor');
    this.weapon = null;
    this.armor = null;
  }
  getInventoryArr(itemType) {
    return [itemType.toUpperCase() + ' LIST:', this.inventory.filter(item => item.type === itemType)];
  }
  showInventory() {
    let list = (itemArr) => {
      console.log(itemArr[0])
      for(let i = 0; i < itemArr[1].length; i++) {
        console.log(Object.keys(itemArr[1][i])[1] + ':', Object.values(itemArr[1][i])[1], '\n', Object.keys(itemArr[1][i])[2] + ':', Object.values(itemArr[1][i])[2]);
    }
  }
    list(this.weaponArr);
    list(this.armorArr);
    list(this.potionArr);
  }
  equip(item) {
    if (item.type === 'weapon') {
      this.weapon = item;
    }
    if (item.type === 'armor') {
      // console.log('some armor')
    }
  }
}

let testChar = new Character (1,
  {strength: 1, agility: 1, toughness: 1},
  {attack: 1, block: 1, dodge: 1},
  [
    {type: 'weapon', name: 'stick', damage: 1},
    {type: 'weapon', name: 'Sword of Balthazar', damage: 10},
    {type: 'armor', name: 'Helm of the Wizard', soak: 2},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'}
  ]);
testChar.xp = 0;


// class Baddie extends Character {
//   constructor(level, attributes, abilities, inventory,actionBias){
//     super(level, attributes, abilities, inventory)
//     this.xp = (level + 1) * 10;
//     this.actions = Math.floor(level/10 + 1)
//     this.actionBias = actionBias;
//   }
// }

// let bob = new Baddie (1, 'some attributes', 'some abilites', 'some inventory', 'an action bias')
// console.log(bob);
//fixed error where attributes weren't included
//set default xp to 0

// console.log(testChar.weaponArr)
testChar.showInventory()

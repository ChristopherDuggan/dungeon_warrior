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
    this.attackTotal = this.attributes.agility + this.abilities.attack;
    this.dodgeTotal = this.attributes.agility + this.abilities.dodge;
    this.blockTotal = this.attributes.strength + this.abilities.block;
    this.damageTotal = this.attributes.strength;
    this.soakTotal = this.attributes.toughness;
    this.initiative = 0;
  }
  getInventoryArr(itemType) {
    return this.inventory.filter(item => item.type === itemType);
  }
  showInventory() {
    let list = (itemArr) => {
      console.log (itemArr[0].type.toUpperCase() + ' LIST:');
      for(let i = 0; i < itemArr.length; i++) {
        console.log(
`Name: ${itemArr[i].name}
${Object.keys(itemArr[i])[2]}: ${Object.values(itemArr[i])[2]}`)
      }
    }
    list(this.weaponArr);
    list(this.armorArr);
    list(this.potionArr);
  }
  // usePotion(item) {
  //   this.potionArr.pop()
  //   this.currentHp +=0
  // }
  equip(item) {
    if (item.type === 'weapon') {
      this.weapon = item;
    }
    if (item.type === 'armor') {
      this.armor = item;
    }
  }
  declare(action, actionName, target = null) {
    let actionId = actionName + this.name;
    if(actionId.includes('dodge') || actionId.includes('block')) {
      return game.defenseQueue.push([actionId, action]);
    } else {
      return game.actionQueue.push([actionId, action, target]);
    }
  }
  attack(target) {
    let rawRoll = game.d10(this.attackTotal);
    // console.log(this.name, 'attacked', target, 'and rolled', attackArr);
    let attackArr = game.adjustRoll(rawRoll);
    // console.log('after adjustment, their remaining rolls are returned below as');
    return attackArr;
  }
  dodge() {
    let rawRoll = game.d10(this.dodgeTotal);
    let dodgeArr = game.adjustRoll(rawRoll);
  return dodgeArr;
  }
  block() {
    let rawRoll = game.d10(this.blockTotal);
    let blockArr = game.adjustRoll(rawRoll);
  return blockArr;
  }
  damage() {
    if(Boolean(this.weapon)) {
      this.damageTotal = this.attributes.strength + this.weapon.damage;
    }
    let rawRoll = game.d10(this.damageTotal);
    console.log(rawRoll)
    let damageArr = game.adjustRoll(rawRoll);
    console.log(damageArr)
    return damageArr;
  }
  soak() {
    if(Boolean(this.armor)) {
      this.soakTotal = this.attributes.toughness + this.armor.soak;
    }
    let rawRoll = game.d10(this.soakTotal);
    console.log(rawRoll)
    let soakArr = game.adjustRoll(rawRoll);
    console.log(soakArr)
    return soakArr;
  }
  run() {
    if(game.d10() > 5) {
      console.log('you escaped! combat ends');
    } else {
      console.log('you didn\'t escape! combat continues')
    }
  }

}

class Player extends Character {
  constructor(level, attributes, abilities, inventory,name){
  super(level, attributes, abilities, inventory, name)
  this.name = name || 'Mysterious_Stranger';
  this.xp = 0;
  }
}

let testChar = new Player (1,
  {strength: 3, agility: 3, toughness: 3},
  {attack: 3, block: 3, dodge: 3},
  [
    {type: 'weapon', name: 'stick', damage: 1},
    {type: 'weapon', name: 'Sword of Balthazar', damage: 10},
    {type: 'armor', name: 'Helm of the Wizard', soak: 2},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'}
  ]);
  testChar.equip(testChar.armorArr[0])

class Baddie extends Character {
  constructor(level, attributes, abilities, inventory){
    super(level, attributes, abilities, inventory)
    this.xp = (level + 1) * 10;
    this.actionsPerTurn = Math.floor(level/10 + 1)
    this.name = 'bob';
  }
}

let bob = new Baddie (1,
  {strength: 1, agility: 1, toughness: 1},
  {attack: 1, block: 1, dodge: 1},
  [
    {type: 'weapon', name: 'stick', damage: 1},
    {type: 'armor', name: 'Helm of the Wizard', soak: 2},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'}
  ]);
// console.log(bob);


// testChar.usePotion()
// testChar.usePotion()
// testChar.dodge([5, 6, 10, 7,])
// testChar.declareAttack('bob', 'dodge');

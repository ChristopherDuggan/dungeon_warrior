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
    this.declaredActionCount = 0;
  }
  getInventoryArr(itemType) {
    return this.inventory.filter(item => item.type === itemType);
  }
  showInventory() {
    let textChunk = `<button class="button" id="closeInventory">CLOSE</button>`;
    let list = (itemArr) => {
      textChunk += `<ul><h3>${itemArr[0].type.toUpperCase()} LIST:</h3>`
      for(let i = 0; i < itemArr.length; i++) {
        textChunk+=
`<li><button class="button" id="select ${itemArr[i].name}">SELECT</button> NAME: ${itemArr[i].name}</li> <li>${Object.keys(itemArr[i])[2].toUpperCase()}: ${Object.values(itemArr[i])[2]}</li>`
      }
      textChunk += `</ul>`
    }
    if(this.weaponArr.length > 0) {list(this.weaponArr)};
    if(this.armorArr.length > 0) {list(this.armorArr)};
    if(this.potionArr.length > 0) {list(this.potionArr)};
    domController.updateTextDisplay(textChunk);
  }
  use(item) {
    if (item.type === 'weapon') {this.weapon = item;}
    if (item.type === 'armor') {this.armor = item}
    if (item.type === 'health potion') {
      this.currentHp += item.heal
      if (this.currentHp > this.maxHp) {this.currentHp = this.maxHp}
      for(let i = 0; i < this.potionArr.length; i++) {
        if(this.potionArr[i].name === item.name) {
          this.potionArr.splice(i, 1);
          this.showInventory();
          return }
      }
    }
  }

  useCombat(item) {
      return item;
  }

  declare(action, actionName, target = null) {
    let actionId = actionName + this.name;
    if(actionId.includes('dodge') || actionId.includes('block')) {
      game.defenseQueue.push([actionId, action]);
      this.declaredActionCount ++;
      if(this.declaredActionCount >= this.actionsPerTurn) {
        if(this.constructor === Player) {
          domController.toggleButtons();
          game.baddieAction(bob, bob.tactics);
        } else {
          game.runActionQueue();
        }
      }
      return;
    } else {
      game.actionQueue.push([actionId, action, target])
      this.declaredActionCount ++;
      if(this.declaredActionCount >= this.actionsPerTurn) {
        if(this.constructor === Player) {
          domController.toggleButtons();
          game.baddieAction(bob, bob.tactics);
        } else {
          game.runActionQueue();
        }
      }
      return;
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
    // console.log(rawRoll)
    let damageArr = game.adjustRoll(rawRoll);
    // console.log(damageArr)
    return damageArr;
  }
  soak() {
    if(Boolean(this.armor)) {
      this.soakTotal = this.attributes.toughness + this.armor.soak;
    }
    let rawRoll = game.d10(this.soakTotal);
    // console.log(rawRoll)
    let soakArr = game.adjustRoll(rawRoll);
    // console.log(soakArr)
    return soakArr;
  }
  run() {
    if(game.d10() > 5) {
      return true;
    } else {
      return false;
    }
  }
  selectItem(choice) {
    if(domController.mode === 'combat') {
      this.declare(this.useCombat(this.inventory.filter(item => item.name === choice.split(' ')[1])[0]), 'select ')
    } else {
      player.use(this.inventory.filter(item => item.name === choice.split(' ')[1])[0]);
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
let player = new Player (1,
  {strength: 3, agility: 3, toughness: 3},
  {attack: 3, block: 3, dodge: 3},
  [
    {type: 'weapon', name: 'stick', damage: 1},
    {type: 'weapon', name: 'Sword_of_Balthazar', damage: 10},
    {type: 'armor', name: 'Helm_of_the_Wizard', soak: 2},
    {type: 'health potion', name: 'Small_Health_Potion', heal: 9, size: 'SM'},
    {type: 'health potion', name: 'Small_Health_Potion', heal: 9, size: 'SM'},
    {type: 'health potion', name: 'Small_Health_Potion', heal: 9, size: 'SM'},
    {type: 'health potion', name: 'Small_Health_Potion', heal: 9, size: 'SM'}
  ]);
  player.use(player.armorArr[0])
  player.use(player.weaponArr[1])

class Baddie extends Character {
  constructor(level, attributes, abilities, inventory){
    super(level, attributes, abilities, inventory)
    this.xp = (level + 1) * 10;
    this.actionsPerTurn = Math.floor(level/10 + 1)
    this.name = 'bob';
    this.tactics = 'maxAggression'
  }
}

let bob = new Baddie (3,
  {strength: 3, agility: 3, toughness: 3},
  {attack: 3, block: 3, dodge: 3},
  [
    {type: 'weapon', name: 'Fist_of_Heaven', damage: 10},
    {type: 'armor', name: 'Big_Noggin', soak: 2},
    {type: 'health potion', name: 'Small_Health_Potion', heal: '+9hp', size: 'SM'}
  ]);

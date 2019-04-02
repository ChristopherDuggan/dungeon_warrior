const d10 = (dice) => {
  let d10Arr = [];
  for (let i = 0; i < (dice || 1); i++) {
    d10Arr.push((Math.ceil(Math.random() * 10)))
  }
  // console.log(`d10Arr: [${d10Arr}]`);
  return d10Arr;
}
const adjustRoll = (rollArr) => {
  rollArr.sort(function(a,b){
      return a - b;
    })
  while(rollArr.includes(1) && rollArr.some((num) => num > 5)) {
    rollArr.shift()
    rollArr.pop()
  }
  console.log(`rollArr: [${rollArr}]`)
  return rollArr;
}
const checkBotch = (arr) => {
  if (arr.includes(1)){
    console.log('botch!')
    return true;
  } else {
    return false;
  }
}
const checkCrit = (arr) => {
  let crit = false;
  if (arr.includes(10)) {
    console.log('crit threat count = ', arr.filter(num => num ===10).length )
    for (let i = 0; i < arr.filter(num => num ===10).length; i++) {
      if (d10()[0] > 5) {
        console.log('crit threat ' + `${i+1}` + ' was a success!')
        crit = true;
        return crit;
      } else {
        console.log('crit threat ' + `${i+1}` + ' didn\'t succeed');
      }
    }
  }
  return crit;
}

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
    this.actionQueue = [];
    this.dodgeQueue = [];
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
  declareActions() {
  //   player character:
  //   while (this.actionQueue.length < this.actionsPerTurn) {
  //     wait for the input of the player.
  //     as the player enters inputs, push them into a character-bound array
  // }
  //   once actionQueue === actionsPerTurn, push the action array to a global array in initiative order
    // baddie:
    // while (this.actionQueue < this.actionsPerTurn) {
    //   select an input based on the baddie AI profile
    //   push them into the character-bound array
    // }
    // then push them to the global array in initiative order.

    // If the character array contains a dodge action, this.dodgeQueue[dodge action].push(dodge action)
    // If a character whose dodgeQueue.length > 0 would bet hit with a successful attack, roll the dodge action and modify the attack accordingly

    // if the character array contains a block action, this.blockQueue[block action].push(block action)
    // If a character whose blockQueue.length > 0 would be dealt damage > 0 (after soak) by an attack, roll the block and modify the damage accordingly


    // for(let i = 0; i < this.actionsPerTurn; i++){
    //   this.actionQueue.push(declareAttack)
    // }
  }
  declareAttack(target) {
    this.actionQueue.push(`attack(${target})`);
  }
  attack(target) {
    let attackArr = d10(this.attackTotal);
    console.log(this.name, 'attacked', target, 'and rolled', attackArr);
    adjustRoll(attackArr);
    console.log('after adjustment, their remaining rolls are', attackArr);
    checkBotch(attackArr);
    //checkDodge(target);
    return attackArr;
  }
    dodge(attackArr) {
    let dodgeArr = d10(this.dodgeTotal);
  }

}

class Player extends Character {
  constructor(level, attributes, abilities, inventory,name){
  super(level, attributes, abilities, inventory, name)
  this.name = name || 'Mysterious Stranger';
  this.xp = 0;
  }
}

let testChar = new Player (1,
  {strength: 1, agility: 3, toughness: 1},
  {attack: 3, block: 1, dodge: 1},
  [
    {type: 'weapon', name: 'stick', damage: 1},
    {type: 'weapon', name: 'Sword of Balthazar', damage: 10},
    {type: 'armor', name: 'Helm of the Wizard', soak: 2},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'},
    {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'}
  ]);

// class Baddie extends Character {
//   constructor(level, attributes, abilities, inventory){
//     super(level, attributes, abilities, inventory)
//     this.xp = (level + 1) * 10;
//     this.actionsPerTurn = Math.floor(level/10 + 1)
//   }
// }
//
// let bob = new Baddie (1,
//   {strength: 1, agility: 1, toughness: 1},
//   {attack: 1, block: 1, dodge: 1},
//   [
//     {type: 'weapon', name: 'stick', damage: 1},
//     {type: 'armor', name: 'Helm of the Wizard', soak: 2},
//     {type: 'health potion', name: 'Small Health Potion', heal: '+9hp', size: 'SM'}
//   ]);
// console.log(bob);


// testChar.usePotion()
// testChar.usePotion()
// testChar.dodge([5, 6, 10, 7,])
// testChar.declareAttack('bob', 'dodge');
testChar.declareActions();
console.log(testChar.actionQueue);

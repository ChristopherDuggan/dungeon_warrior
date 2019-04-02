const game = {
  attributes: {agility: 3},
  abilities: {attack: 3, dodge: 3},
  inventory:
    [
      [{type: 'weapon', name: 'Sword of Balthazar', damage: 10}],
      [{type: 'armor', name: 'Helm of the Wizard', soak: 2}],
      [{type: 'health potion', size: 'SM'}]
    ],
  weapon: null,
  armor: null,
  this.weaponArr: this.inventory,
  // armorArr: this.inventory[1],
  // potionArr: this.inventory[2],





  d10(dice) {
    return this.adjustRoll(this.rawRoll(dice));
  },
  rawRoll(dice) {
    let rawArr = [];
    for (let i = 0; i < (dice || 1); i++) {
      rawArr.push((Math.ceil(Math.random() * 10)))
    }
    console.log(`rawArr: [${rawArr}]`);
    return rawArr;
  },
  adjustRoll(arr) {
    arr.sort(function(a,b){
        return a - b;
      })
    while(arr.includes(1) && arr.some((num) => num > 5)) {
      arr.shift()
      arr.pop()
    }
    console.log(`arr: [${arr}]`)
    return arr;
  },
//   checkBotch(arr) {
//     if (arr.includes(1)){
//       console.log('botch!')
//       return true;
//     } else {
//       return false;
//     }
//   },
//   checkCrit(arr) {
//     if (arr.includes(10)) {
//       console.log('it\'s a crit threat')
//       if (this.rawRoll() > 5) {
//         console.log('crit success!')
//         return true;
//       } else {
//         console.log('it didn\'t succeed though');
//         return false;
//       }
//     }
//   },
//   attack(target) {
//     let attackResult = this.d10(this.attributes.agility + this.abilities.attack);
//     this.checkBotch(attackResult);
//     if (this.checkCrit(attackResult)) {
//
//     };
//     return attackResult;
//   },
//
// // dodge must pass in attack result, do comparison inside.
//   dodge() {
//     let dodgeResult = this.d10(this.attributes.agility + this.abilities.dodge);
//     this.checkBotch(dodgeResult);
//     return dodgeResult;
//   },
//   successCheck(offenseArr, defenseArr) {
//     let successCount = 0;
//     for(let i = 0; i < offenseArr.length; i++) {
//       if (offenseArr[i] > 5) {
//         successCount++;
//       }
//     }
//     for (let i = 0; i < defenseArr.length; i++) {
//       if(defenseArr[i] > 5) {
//         successCount--;
//       }
//     }
//     return successCount
//   },
  // hitCheck() {
  //
  // }
}

console.log(game.weaponArr)

// game.dodge()
// game.checkCrit(game.adjustRoll(game.rawRoll(5)))

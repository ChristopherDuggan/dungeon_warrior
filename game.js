const game = {
  combatantArray: [player, bob],
  actionQueue: [],
  defenseQueue: [],
  critCount: 0,

  d10(dice) {
    let d10Arr = [];
    for (let i = 0; i < (dice || 1); i++) {
      d10Arr.push((Math.ceil(Math.random() * 10)))
    }
    return d10Arr;
  },
  adjustRoll(rollArr) {
    rollArr.sort(function(a,b){
        return a - b;
      })
    while(rollArr.includes(1) && rollArr.some((num) => num > 5)) {
      rollArr.shift()
      rollArr.pop()
    }
    // console.log(`rollArr: [${rollArr}]`)
    let adjustedArr = rollArr
    return adjustedArr;
  },
  checkBotch(arr) {
    if (arr.includes(1)){
      console.log('botch!')
      return true;
    } else {
      return false;
    }
  },
  checkCrit(arr) {
    critCount = 0;
    if (arr.includes(10)) {
      console.log('The attack threatens to be critical!','crit threat count = ', arr.filter(num => num ===10).length )
      for (let i = 0; i < arr.filter(num => num ===10).length; i++) {
        if (game.d10()[0] > 5) {
          console.log('crit threat ' + `${i+1}` + ' was a success!')
          critCount += 1;
        } else {
          console.log('crit threat ' + `${i+1}` + ' didn\'t succeed');
        }
      }
    }
    return critCount;
  },
  checkSucessses(arr) {return arr.filter(num => num > 5).length},
  checkOpposed(offenseCount, defenseCount) {return offenseCount-defenseCount},
  checkDead(target) {
    if (target.currentHp <= 0) {
    console.log(`${target.name} is d - e - d dead!`)
    game.actionQueue = [];
    game.defenseQueue = [];
    domController.changeMode('start')
    return;
    }
  },
  runActionQueue() {
    while(game.actionQueue.length > 0) {
      let netSuccesses = 0;
      let currentAction = game.actionQueue[0];
      let actionId = currentAction[0];
      let actionRoll =  currentAction[1];
      let actionTarget = game.combatantArray.find(obj => obj.name == currentAction[2]);
      let actionDoer = game.combatantArray.find(obj => obj.name == (actionId.split(' ')[actionId.split(' ').length-1]));
      if (actionId.includes('attack')){
        critCount = 0;
        if (actionTarget.currentHp > 0) {
          game.checkCrit(actionRoll)
          if(game.checkBotch(actionRoll)) {
            console.log(`${actionDoer.name} hurt themself and took 5 damage`)
            actionDoer.currentHp -= 5
            game.actionQueue.shift();
          } else if (game.defenseQueue.find(obj => obj.includes('dodge ' + actionTarget.name))) {
            let defenseArr = game.defenseQueue[game.defenseQueue.findIndex(obj => obj.includes('dodge ' + actionTarget.name))][1];
            netSuccesses = game.checkSucessses(actionRoll) - game.checkSucessses(defenseArr);
          } else {
            netSuccesses = game.checkSucessses(actionRoll)
          }

  //         if(game.defenseQueue.find(obj => obj.includes('block ' + actionTarget.name))) {
  // console.log('there is a block')
  //         }

          if (netSuccesses > 1) {
            console.log(`There were ${netSuccesses} total successes. It was a solid hit!`)
            if(game.defenseQueue.find(obj => obj.includes('block ' + actionTarget.name))) {
              let defenseArr = game.defenseQueue[game.defenseQueue.findIndex(obj => obj.includes('block ' + actionTarget.name))][1];
              actionTarget.soakTotal += game.checkSucessses(defenseArr)
            }
            let finalDamage = game.checkOpposed(game.checkSucessses(actionDoer.damage()) * (critCount + 1), game.checkSucessses(actionTarget.soak()));
            if (finalDamage < 0) {finalDamage = 0}
            actionTarget.currentHp -= finalDamage;
            console.log(`${actionDoer.name} did ${finalDamage} damage to ${actionTarget.name}. ${actionTarget.name} has ${actionTarget.currentHp} hp left.`)
            game.checkDead(actionTarget)
            game.actionQueue.shift();
          } else if (netSuccesses === 1) {
            console.log(`There was ${netSuccesses} total success. The attack hits!`)
            if(game.defenseQueue.find(obj => obj.includes('block ' + actionTarget.name))) {
              let defenseArr = game.defenseQueue[game.defenseQueue.findIndex(obj => obj.includes('block ' + actionTarget.name))][1];
              actionTarget.soakTotal += game.checkSucessses(defenseArr)
            }
            let finalDamage =  game.checkOpposed(game.checkSucessses(actionDoer.damage()) * (critCount + 1), game.checkSucessses(actionTarget.soak()));
            if (finalDamage < 0) {finalDamage = 0}
            actionTarget.currentHp -= finalDamage;
            console.log(`${actionDoer.name} did ${finalDamage} damage to ${actionTarget.name}. ${actionTarget.name} has ${actionTarget.currentHp} hp left.`)
            game.checkDead(actionTarget)
            game.actionQueue.shift();
          } else {
            console.log(`There were 0 total successes. The attack missed.`)
            game.checkDead(actionTarget)
            game.actionQueue.shift();
            console.log(game.actionQueue)
          }
        } else {
          console.log(`${actionTarget.name} is already down!`)
          game.actionQueue.shift()
        }
      } else if (actionId.includes('select')) {
        if (actionRoll.type === 'weapon') {actionDoer.weapon = actionRoll;}
        if (actionRoll.type === 'armor') {actionDoer.armor = actionRoll}
        if (actionRoll.type === 'health potion') {
          actionDoer.currentHp += actionRoll.heal
          if(actionDoer.currentHp > actionDoer.maxHp) {actionDoer.currentHp = actionDoer.maxHp}
          for(let i = 0; i < actionDoer.potionArr.length; i++) {
            if(actionDoer.potionArr[i].name === actionRoll.name) {
              actionDoer.potionArr.splice(i, 1);
              game.actionQueue.shift()
              return;
            }
          }
        }
        game.actionQueue.shift()
      } else {
        if(actionDoer.run()) {
          console.log('they ran away')
          game.actionQueue.shift();
          game.actionQueue = [];
          game.defenseQueue = [];
          domController.changeMode('start')
          return;
        } else {
          console.log('they didn\'t run away')
          game.actionQueue.shift();
        }
      }
    }
  },
}

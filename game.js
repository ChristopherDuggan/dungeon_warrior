const game = {
  combatantArray: [testChar, bob],
  actionQueue: [],
  defenseQueue: [],
  critCount: 0,

  d10(dice) {
    let d10Arr = [];
    for (let i = 0; i < (dice || 1); i++) {
      d10Arr.push((Math.ceil(Math.random() * 10)))
    }
      // console.log(d10Arr)
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
      console.log(critCount)
      for (let i = 0; i < arr.filter(num => num ===10).length; i++) {
        if (game.d10()[0] > 5) {
          console.log('crit threat ' + `${i+1}` + ' was a success!')
          critCount += 1;
          console.log(critCount)
        } else {
          console.log('crit threat ' + `${i+1}` + ' didn\'t succeed');
          console.log(critCount)
        }
      }
    }
    return critCount;
  },
  checkSucessses(arr) {return arr.filter(num => num > 5).length},
  //refactor all of the dodge/block check logic and put it BELOW
  checkDefenseQueue() {},
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
  // calcDamage(netSuccesses, crit = false) {
  //   if (crit === true) {
  //     return
  //   } else {
  //     return
  //   }
  // },
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
        console.log(critCount)
        game.checkCrit(actionRoll)
        console.log(critCount)
        if (actionTarget.currentHp > 0) {
          if(game.checkBotch(actionRoll)) {
            console.log(`${actionDoer.name} hurt themself and took 5 damage`)
            actionDoer.currentHp -= 5
            game.actionQueue.shift();
          } else if(game.defenseQueue.find(obj => obj.includes('dodge ' + actionTarget.name))) {
            let defenseArr = game.defenseQueue[game.defenseQueue.findIndex(obj => obj.includes('dodge ' + actionTarget.name))][1];
            game.checkSucessses(defenseArr)
            netSuccesses = game.checkSucessses(actionRoll) - game.checkSucessses(defenseArr);
          } else {
            netSuccesses = game.checkSucessses(actionRoll)
          }

          if (netSuccesses > 1) {
            console.log(`There were ${netSuccesses} total successes. It was a solid hit!`)
            console.log(critCount);
            let finalDamage = game.checkOpposed(game.checkSucessses(actionDoer.damage()) * (critCount + 1), game.checkSucessses(actionTarget.soak()));
            actionTarget.currentHp -= finalDamage;
            console.log(`${actionDoer.name} did ${finalDamage} damage to ${actionTarget.name}. ${actionTarget.name} has ${actionTarget.currentHp} hp left.`)
            game.checkDead(actionTarget)
            game.actionQueue.shift();
          } else if (netSuccesses === 1) {
            console.log(`There was ${netSuccesses} total success. The attack hits!`)
            console.log(critCount);
            let finalDamage =  game.checkOpposed(game.checkSucessses(actionDoer.damage()) * (critCount + 1), game.checkSucessses(actionTarget.soak()));
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
      } else if (actionId.includes('inventory')) {

      } else {
        // ###################RUN###################
      }
    }
  },
}

const game = {
  combatantArray: [testChar, bob],
  actionQueue: [],
  defenseQueue: [],

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
  },
  checkSucessses(arr) {return arr.filter(num => num > 5).length},
  checkDefenseQueue() {},
  checkOpposed(offenseCount, defenseCount) {return offenseCount-defenseCount},
  runActionQueue() {
    let currentAction = game.actionQueue[0];
    let actionId = currentAction[0];
    let actionRoll =  currentAction[1];
    let actionTarget = currentAction[2];
    let actionDoer = actionId.split(' ')[actionId.split(' ').length-1]
    if (actionId.includes('attack')){
      if (game.combatantArray.find(obj => obj.name == actionTarget).currentHp > 0) {
        if(game.checkBotch(actionRoll)) {
          console.log(`${actionDoer} hurth themself and took 5 damage`)
          game.combatantArray.find(obj => obj.name == actionDoer).currentHp -= 5
        }
        console.log(game.checkSucessses(actionRoll))
        if(game.defenseQueue.find(obj => obj.includes('dodge ' + actionTarget))) {
          let defenseArr = game.defenseQueue[game.defenseQueue.findIndex(obj => obj.includes('dodge ' + actionTarget))][1];

          console.log(game.checkSucessses(defenseArr))
          console.log(game.checkSucessses(actionRoll) - game.checkSucessses(defenseArr))
        }
      }
       else {
        game.actionQueue.shift
      }
    }
    // while(game.actionQueue > 0) {
    //
    // }
  },
}

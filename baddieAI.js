//create the combat AI for the baddies

const d10 = (dice) => {
  let rawRoll = [];
  for (let i = 0; i < (dice || 1); i++) {
    rawRoll.push((Math.ceil(Math.random() * 10)))
  }
  if (rawRoll.length === 1) {rawRoll = rawRoll[0]}
  return rawRoll;
}

const attack = () 


attack()


//
// block()
// dodge()
// inventory()
// run()
//
// // AI types (for now): Maximum Aggression, Aggressive, Tank, Dodger, Coward
//
// // MAXIMO AGGRESSINO
// for (let i = 0; i < this.actions) {
//   if (this.currentHp/this.maxHp <= 0.1 && this.inventory.some(isHPotion)) {
//     if(d10() > 1) {
//       attack()
//     } else {
//       inventory(use(Hpotion))
//     }
//   }
// }

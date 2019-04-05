const isHPotion = a => a.type === 'health potion';

const tacticsBox = {
  'maxAggression': function () {
    for (let i = 0; i < this.actionsPerTurn; i++) {
      if (this.currentHp/this.maxHp <= 0.1 && this.inventory.some(isHPotion())) {
        if(game.d10() > 5) {
          this.declare(this.attack(), 'attack ', 'Mysterious_Stranger')
        } else {
          this.declare(this.useCombat(this.inventory.filter(item => item.name === choice.split(' ')[1])[0]), 'select ')
        }
      } else {
        this.declare(this.attack(), 'attack ', 'Mysterious_Stranger')
      }
    }
  }
}



// // AI types (for now): Maximum Aggression, Aggressive, Tank, Dodger, Coward
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

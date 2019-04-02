const rawRoll = (dice) => {
  let rawArr = [];
  for (let i = 0; i < (dice || 1); i++) {
    rawArr.push((Math.ceil(Math.random() * 10)))
  }
  // console.log(`rawArr: [${rawArr}]`);
  return rawArr;
}
const sumRoll = (dice) => {
  return rawRoll(dice).reduce(function(total, num){
    return total + num;
  });
}


class Item {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
}

// class Weapon extends Item {
//   super()
// }

class HealthPotion extends Item {
  constructor(heals){
    super()
    this.heals = heals;
    this.type = 'health potion';
    this.size = 'small'
    if (this.heals < 5) {
      this.heals = 5;
    }
    if (this.heals > 10) {
      this.size = 'medium';
    }
    if (this.heals > 20) {
      this.size = 'large';
    }
    if (this.heals > 40) {
      this.size = 'mega'
    }
    if (this.heals > 80) {
      this.size = 'maximum'
    }
    this.name = this.size + ' ' + this.type;
  }
}

// case < 999:
//   this.size = 'maximum'
//   this.damage = -999;
//   break;
// case heals > :
//   this.size = 'large'
//   this.damage = -36;
//   break;
// case heals > 10:
//   this.size = 'medium'
//   this.damage = -18;
//   break;

const healthPotionSmall = new HealthPotion(sumRoll())
const healthPotionMedium = new HealthPotion(sumRoll(2))
const healthPotionLarge = new HealthPotion(sumRoll(4))
const healthPotionMax = new HealthPotion(sumRoll(20));

console.log(healthPotionMax);

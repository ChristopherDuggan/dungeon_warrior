
const d10 = (dice) => {
  let d10Arr = [];
  for (let i = 0; i < (dice || 1); i++) {
    d10Arr.push((Math.ceil(Math.random() * 10)))
  }
  // console.log(`d10Arr: [${d10Arr}]`);
  return d10Arr;
}
const sumRoll = (dice) => {
  return d10(dice).reduce(function(total, num){
    return total + num;
  });
}

d10(5)

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

// const healthPotionSmall = new HealthPotion(sumRoll())
// const healthPotionMedium = new HealthPotion(sumRoll(2))
// const healthPotionLarge = new HealthPotion(sumRoll(4))
// const healthPotionMax = new HealthPotion(sumRoll(20));

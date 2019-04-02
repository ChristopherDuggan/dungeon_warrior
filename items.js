class Item {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
}

class HealthPotion extends Item {
  constructor(size){
    super()
    this.type = 'health potion';
    this.size = size;
    switch (size) {
      case 'maximum':
        this.damage = -999;
        break;
      case 'large':
        this.damage = -36;
        break;
      case 'medium':
        this.damage = -18;
        break;
      default:
        this.size = 'small'
        this.damage = -9;
    }
    this.name = `${this.size} ${this.type}`
    this.heals = -this.damage + 'hp';
  }
}

const healthPotionSmall = new HealthPotion ('small')
const healthPotionMedium = new HealthPotion ('medium')
const healthPotionLarge = new HealthPotion ('large')
const healthPotionMax = new HealthPotion ('maximum')

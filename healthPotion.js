class HealthPotion {
  constructor(size){
    this.type = 'health potion'
    this.size = size;
    switch (size) {
      case 'MAX':
        this.damage = -999;
        break;
      case 'LRG':
        this.damage = -36;
        break;
      case 'MED':
        this.damage = -18;
        break;
      default:
        this.size = 'SM'
        this.damage = -9;
    }
  }
}
const healthPotSm = new HealthPotion('SM')
const healthPotMed = new HealthPotion('MED')
const healthPotLrg = new HealthPotion('LRG')
const healthPotMax = new HealthPotion('MAX')

const isHPotion = a => a.type === 'health potion';

let x = {
  inventory: ['sword', healthPotSm]
}
console.log(x.inventory)
console.log(x.inventory.some(isHPotion))

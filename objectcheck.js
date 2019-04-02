class HealthPotion {
  constructor(size){
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
const smallHP = new HealthPotion('MAX')
console.log(smallHP);

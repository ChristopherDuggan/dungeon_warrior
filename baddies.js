class Baddie {
  constructor (hp, level, attributes, abilities, xp, loot) {
    this.hp = hp
    this.level = level;
    this.attributes = attributes;
    this.abilities = abilities;
    this.xp = xp
    this.loot = loot;
  }
}

let weenie = new Baddie(3, 0, {strength: 1, agility: 1, toughness: 1}, {attack: 1, block: 1, dodge: 1}, 10, null)

let toughGuy = new Baddie(8, 0, {strength: 2, agility: 2, toughness: 3}, {attack: 2, block: 3, dodge: 1}, 30, null)

let strongGuy = new Baddie(8, 0, {strength: 3, agility: 2, toughness: 2}, {attack: 3, block: 1, dodge: 2}, 30, null)

let fastGuy = new Baddie(8, 0, {strength: 2, agility: 3, toughness: 2}, {attack: 1, block: 2, dodge: 3}, 30, null)

let miniBoss = new Baddie(20, 0, {strength: 5, agility: 3, toughness: 5}, {attack: 5, block: 4, dodge: 4}, 10, null)

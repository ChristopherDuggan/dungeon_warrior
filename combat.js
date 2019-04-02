// steps!
// 1. initialize baddie and character
// 2. roll initiative for each character. player wins ties. higher level character wins ties, player wins those ties, ties between same level baddies are picked at random
// 3. baddie declares actions
// 4. If player initiative is higher than baddie initiative, baddie declares actions first, player gets to see them
// 5. player declares actions, which are pushed to initiative queue
// 6. all defensive actions are rolled and stored in a defense array for each character
// 7. First action in initiative queue is rolled. If defensive action is necessary, defensive rolls are put up against offensive rolls. If run action is used, escape chance is calculated. If successful, combat ends.
// 8. damage/healing is calculated and reflected in stats.
// 9. Check to see if character or baddie hp <=0. If so, end combat.
// 10. repeat steps 7-9 until initiative queue is empty.
// 11. begin again at step 2.

const player = {
  name: 'chris',
  agility: 1,
  level: 1,
}


class Baddie {
  constructor (hp, level, attributes, abilities, xp, loot) {
    this.hp = hp;
    this.level = level;
    this.attributes = attributes;
    this.abilities = abilities;
    this.xp = xp;
    this.loot = loot;
  }
}

let weenie = new Baddie(3, 0, {strength: 1, agility: 1, toughness: 1}, {attack: 1, block: 1, dodge: 1}, 10, null)

let toughGuy = new Baddie(8, 0, {strength: 2, agility: 2, toughness: 3}, {attack: 2, block: 3, dodge: 1}, 30, null)

let strongGuy = new Baddie(8, 0, {strength: 3, agility: 2, toughness: 2}, {attack: 3, block: 1, dodge: 2}, 30, null)

let fastGuy = new Baddie(8, 0, {strength: 2, agility: 3, toughness: 2}, {attack: 1, block: 2, dodge: 3}, 30, null)

let miniBoss = new Baddie(20, 0, {strength: 5, agility: 3, toughness: 5}, {attack: 5, block: 4, dodge: 4}, 10, null)

let
const combatants = [baddie, roger, pooBear, player]

const d10 = (dice) => {
  let rawRoll = [];
  for (let i = 0; i < (dice || 1); i++) {
    rawRoll.push((Math.ceil(Math.random() * 10)))
  }
  if (rawRoll.length === 1) {rawRoll = rawRoll[0]}
  return rawRoll;
}

// 2. roll initiative for each character
const getInitiative = (combatants) => {
  let initiativeOrder = [];
  for (let i = 0; i < combatants.length; i++){
    combatants[i].initiative = d10() + combatants[i].agility;
    initiativeOrder.push(combatants[i]);
  }
  initiativeOrder.sort((a, b) => (a.initiative > b.initiative) ? 1
  : (a.initiative === b.initiative) ? ((a.level > b.level) ? 1 : -1) : -1 );
  return initiativeOrder;
}

getInitiative(combatants)

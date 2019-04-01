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

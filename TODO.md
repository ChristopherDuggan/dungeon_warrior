1. Add all methods to the character class
  -attack
  -dodge
  -block
  -run
  -rollInitiative function
  -Action declaration functionality
  -death
    --for char: game end/reset
    --for baddies: loot drop
      ---xp exchange
      ---loot drop chances
  -inventory
    --use potion
    --equip item

BIG STUFF
Refactor complex action functions (action declaration etc) to use objects rather than arrays to carry information

Make it so dodge/block actions only use up the successes necessary to bring attack/damage to 0, leaving the remaining successes in the defenseQueue

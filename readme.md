# DUNGEON WARRIOR

Dungeon Warrior is a dungeon crawling adventure/rpg with turn based combat. Each level is a 10 x 10 grid, initially obscured from the player except for the squares immediately adjacent to their character. As they move through the level, more squares will be revealed and they will encounter baddies and loot.

## The Character:
Players create their character at the start of the game, spending points to customize their three attributes: Strength, Agility, and Toughness. They then spend points to customize their three attributes: Attack, Dodge, and Block. Each of those stats will have an impact on combat.

## Combat:
Combat consists of rolling initiative to determine who gets to act first, the combatants declaring their actions, then those actions resolving in (mostly) in order of initiative, high to low.

Characters can take five actions: attack, dodge, block, inventory, or run. The player gets to take 2 actions each turn and (most) baddies just get one. The exceptions to initiative order are defensive actions (dodge and block). Once declared, they occur whenever it's necessary for the character to defend themselves, regardless of order.

### The Actions:

* Attack - The character tries to hit their opponent. Chance to hit is based on Agility and Attack. Damage is based on Strength and the weapon used.
* Dodge - The character tries to dodge an incoming Attack. Based on Agility and Dodge.
* Block - The character tries to reduce the damage of an attack once they've been hit. Based on Toughness and Block.
* Run - The character tries to escape from combat. Based on Agility.
* Inventory - The character spends an action to use something that's in their inventory.

## Inspiration:
This game's underlying logic has been is largely based on the World of Darkness' d10 system, my favorite tabletop roleplaying system by far.

## MVP
* A functional character object
* An inventory system
* Equipping of weapons and armor
* A functional one on one combat system

## Future Plans
* Traversable grid based maps with multiple levels
* Combat against multiple enemies
* Character parties with up to 4 members
* Graphics that actually look nice 

## (Very) Rough Wireframes

![](https://lh3.googleusercontent.com/-u-bPFTjO31c/XKIaSOy9G3I/AAAAAAAAMYc/44aOIQMwauo1inItSfVqslovq9vEYg67QCK8BGAs/s0/2019-04-01.jpg)


![](https://lh3.googleusercontent.com/-7kxMAIAbh54/XKIaRiHlp0I/AAAAAAAAMYY/jlsnf6i7I2AvuNF58rNnl8WF94y9y0E3QCK8BGAs/s0/2019-04-01.jpg)

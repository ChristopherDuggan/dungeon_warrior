const d10 = (dice) => {
  let rawRoll = [];
  for (let i = 0; i < (dice || 1); i++) {
    rawRoll.push((Math.ceil(Math.random() * 10)))
  }
  return rawRoll;
}
let over5 = (num) => num > 5;

let diceArray = d10(3);
diceArray = diceArray.sort(function(a,b){
    return a - b;
  })

console.log(diceArray)

const checkBotch = (arr) => {
  while(arr.includes(1) && arr.some(over5)) {
    arr.shift()
    arr.pop()
    console.log(arr)
  }
  if(arr.includes(1)) {
    return botch()
  }
  if(arr.includes(10)) {
    return crit()
  }
}


const botch = () => {
  console.log('a botch')
}
const crit = () => {
  console.log('a crit')
}



//   (arr.includes(1) && arr.some(over5))
//    {
//        arr.splice(Math.min(...arr), 1);
//        arr.splice(Math.max(...arr), 1);
//      }
//
//   console.log(arr)
//   console.log(diceArray)
// }
console.log(checkBotch(diceArray))
// If there are any ones in the array, if there are any dice showing 6 or higher, remove the highest value one.

// attack() {
//   diceArray = []
//   let successes=0;
//   for (let i = 0; i < this.attributes.agility + this.abilities.attack; i++) {
//     diceArray.push(d10());
//   }
//
//
//   console.log(diceArray);
//   console.log(diceArray.reduce(function(a,b) {
//     return Math.max(a,b)
//   }));
//   console.log(diceArray.reduce(function(a,b) {
//     return Math.min(a,b)
//   }));
//   let diceArraySorted = diceArray.sort(function(a,b){
//     return a -b;
//   })
// //   let checkTens = () => {
// //     diceArraySorted.forEach(function(num) {
// //     if(num > 5) {
// //       if (num == 10){
// //         console.log('it works');
// //       }
// //     }
// //   })
// // }
//   let checkOnes = () => {
//     let oneCount=0
//     diceArraySorted.forEach(function(num) {
//     if(num == 1) {
//       oneCount++;
//     }
//   })
//   return oneCount;
// }
// console.log(checkOnes())
//
//
//
//   //  let isItOne = (num) => (num === 1)
//   // let ones = diceArray.filter(num => num == 1)
//
// }

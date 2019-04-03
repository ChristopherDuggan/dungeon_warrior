//Create logic to change controls based on which mode the game is in.
//WRAP EVERYTHING IN AN OBJECT
const domController = {

}


const body = document.querySelector('body');
let main = document.createElement('main');
let buttonBox = document.createElement('div');
let mode = '';

main.style.height = '500px';
main.style.width = '500px';
main.style.backgroundColor = 'grey';
buttonBox.style.height = '100px';
buttonBox.style.width = '500px';
buttonBox.style.backgroundColor = 'black';
buttonBox.id = 'buttonBox';


let combatButtonArr = ['inventory','attack', 'dodge', 'block', 'run'];
let mapButtonArr = ['inventory','up', 'down','left','right']

body.appendChild(main);
body.appendChild(buttonBox);

const makeButtons = (array) => {
  buttonBox.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
    let newButton = document.createElement('button');
    newButton.className = 'button';
    newButton.id = `${array[i]}`
    newButton.innerHTML = `${array[i]}`;
    buttonBox.appendChild(newButton);
  }
}

const changeMode = (currentMode) => {
  mode = currentMode;
  let x = mode +'ButtonArr'
  makeButtons(x)
  // makeButtons(`${mode}`+ButtonArr)
};

changeMode('combat');
// makeButtons(combatButtonArr)

const domAction = (choice) => {
  console.log(`perform the ${choice} action`)
}

body.addEventListener('click', e => {
  console.log(e.target)
  if (e.target.classList.contains('button')) {
    console.log(e.target.id);
    domAction(e.target.id)
  }
});
window.addEventListener('keydown', function(e) {
  if (e.defaultPrevented) {
    return;
  }
  if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
    return;
  }
  console.log(e.code)
  switch(e.code) {
    case 'Digit1':
      domAction('inventory')
      break;
    case 'Digit2':
      domAction('attack');
      break;
    case 'Digit3':
      domAction('dodge');
      break;
    case 'Digit4':
      domAction('block');
      break;
    case 'Digit5':
      domAction('run')
      break;
    case 'ArrowUp':
      domAction('up')
      break;
    case 'ArrowDown':
      domAction('down')
      break;
    case 'ArrowLeft':
      domAction('left')
      break;
    case 'ArrowRight':
      domAction('right')
      break;
    default:
      return;
  }
})

const domController = {
  body: document.querySelector('body'),
  main: document.createElement('main'),
  buttonBox: document.createElement('div'),
  textDisplay: document.createElement('div'),
  mode:'combat',
  buttons: true,


  'combatButtonArr': ['inventory','attack', 'dodge', 'block', 'run'],
  'mapButtonArr': ['inventory','up', 'down','left','right'],
  'startButtonArr': ['weenie', 'chumpo','tuff tim','MeanMug', 'THE BRUTALIZER'],

  setMain() {
    this.main.style.height = '50px';
    this.main.style.width = '500px';
    this.main.style.backgroundColor = 'grey';
    this.body.appendChild(this.main);
  },
  setButtonBox() {
    this.buttonBox.style.height = '25px';
    this.buttonBox.style.width = '500px';
    this.buttonBox.style.backgroundColor = 'green';
    this.buttonBox.id = 'buttonBox';
    this.body.appendChild(this.buttonBox);
  },
  setTextDisplay() {
    this.textDisplay.style.width = '500px';
    this.textDisplay.style.height = '300px';
    this.textDisplay.style.backgroundColor = 'black';
    this.textDisplay.style.color = '#ddd';
    this.textDisplay.style.fontSize = '20px';
    this.textDisplay.style.overflow = 'scroll';
    this.textDisplay.id = 'textDisplay';
    this.body.appendChild(this.textDisplay);
  },
  makeButtons(arr) {
    this.buttonBox.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
      let newButton = document.createElement('button');
      newButton.className = 'button';
      newButton.id = `${arr[i]}`
      newButton.innerHTML = `${arr[i]}`;
      this.buttonBox.appendChild(newButton);
    }
  },
  domAction(choice) {
    console.log(`perform the ${choice} action`)
    if(choice.includes('select'))  {
      player.selectItem(choice);
      this.textDisplay.innerHTML = '';
    } else if (choice.includes('closeInventory')) {
      domController.closeInventory();
    } else if (choice.includes('inventory')) {
      player.showInventory();
    } else if (choice.includes('attack')) {
      player.declare(player.attack(), 'attack ', 'bob')
    } else if (choice.includes('dodge')) {
      player.declare(player.dodge(), 'dodge ')
    } else if (choice.includes('run')) {
      player.declare(player.run(), 'run ')
    } else if (choice.includes('block')) {
      player.declare(player.block(), 'block ')
    }
  },
  addListeners() {
    domController.body.addEventListener('click', e => {
      console.log(e.target)
      if (e.target.classList.contains('button')) {
        console.log(e.target.id);
        domController.domAction(e.target.id)
      }
    }),
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
          domController.domAction('inventory')
          break;
        case 'Digit2':
          domController.domAction('attack');
          break;
        case 'Digit3':
          domController.domAction('dodge');
          break;
        case 'Digit4':
          domController.domAction('block');
          break;
        case 'Digit5':
          domController.domAction('run')
          break;
        case 'ArrowUp':
          domController.domAction('up')
          break;
        case 'ArrowDown':
          domController.domAction('down')
          break;
        case 'ArrowLeft':
          domController.domAction('left')
          break;
        case 'ArrowRight':
          domController.domAction('right')
          break;
        default:
          return;
      }
    })
  },
  initDom() {
    this.setMain()
    this.setButtonBox()
    this.setTextDisplay()
    this.makeButtons(this.combatButtonArr)
    this.addListeners()
  },
  updateTextDisplay(info) {
    this.textDisplay.innerHTML = info
  },
  changeMode(newMode) {
    this.mode = newMode;
    this.makeButtons(this[`${newMode}ButtonArr`])
  },
  closeInventory() {
    domController.updateTextDisplay('')
  },
  toggleButtons() {
    this.buttons =! this.buttons
    let allButton = document.querySelectorAll('button')
    if(this.buttons === false) {
      for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.add('hidden')
      }
    } else {
      for (let i = 0; i < allButton.length; i++) {
        allButton[i].classList.remove('hidden')
      }
    }
  },
}

domController.initDom()

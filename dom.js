const domController = {
  body: document.querySelector('body'),
  main: document.createElement('main'),
  buttonBox: document.createElement('div'),
  textDisplay: document.createElement('div'),
  overlay: document.createElement('div'),
  mode:'start',
  buttons: true,


  'combatButtonArr': ['inventory','attack', 'dodge', 'block', 'run'],
  'mapButtonArr': ['inventory','up', 'down','left','right'],
  'startButtonArr': ['start'],

  setMain() {
    this.main.style.height = '300px';
    this.main.style.width = '800px';
    this.main.style.border = 'solid grey 5px'
    this.main.innerHTML =
    `<p>also known as duggan warrior...<br><br><br>
    or christopher dungeon...<br><br><br>
    once you select your opponent, it's kill...<br><br><br>
    ...or be killed</p>`;
    this.body.appendChild(this.main);
  },
  setButtonBox() {
    this.buttonBox.style.height = '40px';
    this.buttonBox.style.width = '800px';
    this.buttonBox.id = 'buttonBox';
    this.body.appendChild(this.buttonBox);
  },
  setTextDisplay() {
    this.textDisplay.style.width = '800px';
    this.textDisplay.style.height = '400px';
    this.textDisplay.style.border = 'solid grey 5px'
    this.textDisplay.style.color = '#ddd';
    this.textDisplay.style.overflow = 'auto ';
    this.textDisplay.id = 'textDisplay';
    this.body.appendChild(this.textDisplay);
  },
  setOverlay() {
    this.overlay.className = 'overlay';
    this.textDisplay.appendChild(this.overlay)
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
    } else if (choice.includes('start')) {
      domController.changeMode('combat')
    }

  },
  addListeners() {
    domController.body.addEventListener('click', e => {
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
    this.makeButtons(this.startButtonArr)
    this.addListeners()
    this.setOverlay()
  },
  updateTextDisplay(info) {
    newTag = document.createElement('div');
    newTag.innerHTML = info;
    this.textDisplay.prepend(newTag)
  },
  changeMode(newMode) {
    this.mode = newMode;
    this.makeButtons(this[`${newMode}ButtonArr`])

    // combat, start, win, lose, escape
    if(this.mode === 'start' ) {
      this.main.innerHTML =
      `<p>also known as duggan warrior...
      or christopher dungeon...
      once you start, it's kill...
      ...or be killed</p>`;
    }
    if(this.mode === 'combat' ) {
      this.main.innerHTML =
      `<div id="playerDiv">
      <h4>${player.name}</h4>
        <img src ="images/playerReady.png">\
        <h4>${player.currentHp} hp</h4>
      </div>
      <div id="baddieDiv">
        <h4>${bob.name}</h4>
        <img src ="images/bobReady.png">
        <h4>${bob.currentHp} hp</h4>
      </div>`
    }
    if(this.mode === 'win') {

    }
    if(this.mode === 'lose') {

    }
    if(this.mode === 'escape' ) {

    }
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

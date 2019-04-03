const domController = {
  body: document.querySelector('body'),
  main: document.createElement('main'),
  buttonBox: document.createElement('div'),
  mode:'',


  'combatButtonArr': ['inventory','attack', 'dodge', 'block', 'run'],
  'mapButtonArr': ['inventory','up', 'down','left','right'],

  setMain() {
    this.main.style.height = '500px';
    this.main.style.width = '500px';
    this.main.style.backgroundColor = 'grey';
    this.body.appendChild(this.main);
  },
  setButtonBox() {
    this.buttonBox.style.height = '100px';
    this.buttonBox.style.width = '500px';
    this.buttonBox.style.backgroundColor = 'black';
    this.buttonBox.id = 'buttonBox';
    this.body.appendChild(this.buttonBox);
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
    this.makeButtons(this.combatButtonArr)
    this.addListeners()
  },
  changeMode(newMode) {
    this.mode = newMode;
    this.makeButtons(this[`${newMode}ButtonArr`])
  }

}

domController.initDom()

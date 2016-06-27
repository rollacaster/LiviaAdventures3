const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload, create, update, render })

let map
let layer
let contextMenu
let washingMachines = []
let student
let isStudentRunning = false

const menuEntries = [
  {
    text: 'Buy',
    action (x, y) {
      const washingMachine = game.add.sprite(x, y, 'washingMachine')
      washingMachines.push(washingMachine)
      game.physics.arcade.enable(washingMachine)
      washingMachine.scale.setTo(0.1, 0.1)
      washingMachine.body.enable = true
      washingMachine.body.immovable = true
      contextMenu.destroy()
    }
  }
]

function preload () {
  game.load.tilemap('floor', 'assets/floor.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.image('tiles', 'assets/terrain.png')
  game.load.spritesheet('button', 'assets/contextMenu.png', 193, 71)
  game.load.spritesheet('washingMachine', 'assets/washingMachine.png')
  game.load.spritesheet('student', 'assets/student.png', 57, 99, 14)
}

function create () {
  map = game.add.tilemap('floor')
  map.addTilesetImage('terrain', 'tiles')
  layer = map.createLayer('Tile Layer 1')
  layer.inputEnabled = true
  layer.events.onInputDown.add(onTileClicked)

  game.physics.startSystem(Phaser.Physics.ARCADE)
  student = game.add.sprite(120, 120, 'student')
  game.physics.arcade.enable(student)

  student.body.enable = true
  student.body.setSize(50, 20, 0, 80)
  student.body.collideWorldBounds = true
  student.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 14, true)
  student.animations.add('right', [7, 8, 9, 10, 11, 12, 13], 14, true)
}

function update () {
  game.physics.arcade.collide(map.getTile(0, 0), game.input.mousePointer)
  washingMachines.forEach((washingMachine) => game.physics.arcade.collide(washingMachine, student, handleCollide))
  if (isStudentRunning) { student.animations.play('right') }

  findWashingMachine()
}

function findWashingMachine () {
  washingMachines.map((washingMachine, index) => {
    const distance = student.position.distance(washingMachine.position)
    return { distance, index }
  }).reduce((closestWashingMachineIndex, {distance, index}) => {
  }, {distance: Number.MAX_SAFE_INTEGER, index: 0})
}

function handleCollide () {
  student.animations.stop(true)
  isStudentRunning = false
}

function onTileClicked (tile, event) {
  if (contextMenu) { contextMenu.destroy() }
  createContextMenu(menuEntries, {x: event.clientX, y: event.clientY})
}

const createContextMenu = (menuEntries, {x, y}) => {
  contextMenu = game.add.group()
  menuEntries.forEach(({text, action}, index) => {
    let contextMenuEntry = game.add.group()
    const button = contextMenuEntry.create(x, y + index * 10, 'button')
    button.inputEnabled = true
    button.events.onInputDown.add(menuEntries[index].action.bind({}, x, y))
    contextMenuEntry.add(game.add.text(x + 70, y + 10 + index * 10, 'Buy'))
    contextMenu.add(contextMenuEntry)
  })
}

function render () {
  game.debug.body(student)
}

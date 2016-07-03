const Student = require('./Student')
const { washingMachineState } = require('./constants')

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload, create, update })

let map
let layer
let contextMenu
let washingMachines = []
let marker
let contextMenuOpen

const menuEntries = [
  {
    text: 'Buy',
    action (x, y) {
      const washingMachine = game.add.sprite(marker.x + 6.4, marker.y, 'washingMachine')
      washingMachines.push(washingMachine)
      game.physics.arcade.enable(washingMachine)
      washingMachine.scale.setTo(0.1, 0.1)
      washingMachine.body.enable = true
      washingMachine.body.immovable = true
      washingMachine.state = washingMachineState.FREE
      contextMenuOpen = false
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
  game.physics.startSystem(Phaser.Physics.ARCADE)

  map = game.add.tilemap('floor')
  map.addTilesetImage('terrain', 'tiles')
  layer = map.createLayer('Tile Layer 1')
  layer.inputEnabled = true
  layer.events.onInputDown.add(onTileClicked)

  marker = game.add.graphics()
  marker.lineStyle(2, 0xffffff, 1)
  marker.drawRect(0, 0, 64, 64)
  game.input.addMoveCallback(updateMarker, this)
  Student.create(game)
}

function updateMarker () {
  if (!contextMenuOpen) {
    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32
  }
}

function update () {
  Student.update(game, washingMachines)
}

function onTileClicked (tile, event) {
  if (contextMenu) {
    contextMenuOpen = false
    contextMenu.destroy()
  }
  createContextMenu(menuEntries, {x: event.clientX, y: event.clientY})
}

const createContextMenu = (menuEntries, {x, y}) => {
  contextMenuOpen = true
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


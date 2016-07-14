const Student = require('./Student')
const ContextMenu = require('./ContextMenu')

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload, create, update })

let map
let layer

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
  layer.events.onInputDown.add(
    (_, {clientX, clientY}) => ContextMenu.open(game, layer, {x: clientX, y: clientY})
  )

  ContextMenu.create(game, layer)
  Student.create(game)
}

function update () {
  Student.update()
}

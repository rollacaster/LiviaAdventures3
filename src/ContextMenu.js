const { buyWashingMachine } = require('./WashingMachine')

let contextMenu
let contextMenuOpen
let marker

const menuEntries = [
  {
    text: 'Buy',
    action: buyWashingMachine
  }
]

exports.create = (game, layer) => {
  marker = game.add.graphics()
  marker.lineStyle(2, 0xffffff, 1)
  marker.drawRect(0, 0, 64, 64)
  game.input.addMoveCallback(() => updateMarker(game, layer), this)
}

exports.open = (game, layer, {x, y}) => {
  if (contextMenuOpen) {
    contextMenuOpen = false
    contextMenu.destroy()
    updateMarker(game, layer)
  } else {
    createContextMenu(game, menuEntries, {x, y})
    contextMenuOpen = true
  }
}

const createContextMenu = (game, menuEntries, {x, y}) => {
  contextMenuOpen = true
  contextMenu = game.add.group()
  menuEntries.forEach(({text, action}, index) => {
    let contextMenuEntry = game.add.group()
    const button = contextMenuEntry.create(x, y + index * 10, 'button')
    button.inputEnabled = true
    button.events.onInputDown.add(() => {
      menuEntries[index].action(game, marker)
      contextMenuOpen = false
      contextMenu.destroy()
    })
    contextMenuEntry.add(game.add.text(x + 70, y + 10 + index * 10, text))
    contextMenu.add(contextMenuEntry)
  })
}

function updateMarker (game, layer) {
  if (!contextMenuOpen) {
    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32
  }
}


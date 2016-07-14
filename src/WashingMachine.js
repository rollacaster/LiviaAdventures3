const { washingMachineState } = require('./constants')
exports.washingMachines = []

exports.buyWashingMachine = function (game, marker) {
  const washingMachine = game.add.sprite(marker.x + 6.4, marker.y, 'washingMachine')
  exports.washingMachines.push(washingMachine)
  game.physics.arcade.enable(washingMachine)
  washingMachine.scale.setTo(0.1, 0.1)
  washingMachine.body.enable = true
  washingMachine.body.immovable = true
  washingMachine.state = washingMachineState.FREE
}

const { Grid, AStarFinder } = require('pathfinding')
const { washingMachineState } = require('./constants')

let student

function update (game, washingMachines) {
  findWashingMachine(student, washingMachines)
}

function create (game) {
  student = game.add.sprite(60 + Math.random() * 700, 120, 'student')
  game.physics.arcade.enable(student)
  student.body.enable = true
  student.body.setSize(50, 20, 0, 80)
  student.animations.add('left', [0, 1, 2, 3, 4, 5, 6], 14, true)
  student.animations.add('right', [7, 8, 9, 10, 11, 12, 13], 14, true)
  return student
}

function findWashingMachine (student, washingMachines) {
  washingMachines.forEach((washingMachine) => {
    if (washingMachine.state === washingMachineState.FREE) {
      washingMachine.state = washingMachineState.WORKING

      const grid = new Grid(25, 19)
      const finder = new AStarFinder()
      const path = finder.findPath(getTileForPosition(student.x), getTileForPosition(student.y), getTileForPosition(washingMachine.x), getTileForPosition(washingMachine.y), grid)
      path.forEach(([x, y], index) => {
        if (student.x > x * 32) {
          student.animations.play('left')
        } else if (student.x < x * 32) {
          student.animations.play('right')
        }

        setTimeout(() => {
          student.x = x * 32
          student.y = y * 32
          if (index === path.length - 1) {
            student.animations.stop()
          }
        }, 200 * index)
      })
    }
  })
}

const getTileForPosition = (x) => Math.floor(x / 32)

module.exports = { update, create }

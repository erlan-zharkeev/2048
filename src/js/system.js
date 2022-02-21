import Square from './square'
import { getRandNum } from './helpers'
import { clearSquares, loadSquares } from './domUpdate'

function startMove(dir) {
  new Square(getRandNum(), dir)
}

export function initGame() {
  for (let i = 0; i < global.$state.getInitSquaresQuantity(); i += 1) {
    new Square(getRandNum())
  }
}

export function initNewGame() {
  global.$state.resetScore()
  clearSquares()
  initGame()
}

export function loadGameFromLs(lsData) {
  loadSquares(lsData.squares)
  global.$state.setScore(lsData.score)
  global.$state.setSoundStatus(lsData.soundStatus)
}

export function initMove(e) {
  const posKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  posKey.forEach((key) => {
    if (e.key === key) startMove(key)
  })
}

export function listenSwipe() {
  const swipeArea = global.$state.$refs().table
  const hammerTime = new Hammer(swipeArea)
  hammerTime.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
    pointers: 1,
  })
  hammerTime.on('swipe', (event) => {
    const dirNum = event.direction
    switch (dirNum) {
      case 8:
        startMove('ArrowUp')
        break
      case 16:
        startMove('ArrowDown')
        break
      case 2:
        startMove('ArrowLeft')
        break
      case 4:
        startMove('ArrowRight')
        break
      default:
        break
    }
  })
}

export default null

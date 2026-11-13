import Hammer from 'hammerjs'
import { Board, sound } from './board'
import { getRandNum } from './helpers'
import { state } from './state'
import { storage } from './local-storage'

const board = new Board()

function updateGameStatus() {
  state.setGameOver(!board.hasAvailableMoves())
}

function startMove(dir) {
  if (state.isGameOver()) return
  if (!board.move(dir)) return

  board.addSquare(getRandNum())
  sound('move')
  updateGameStatus()
  storage.saveAll()
}

export function initGame() {
  state.setGameOver(false)
  for (let i = 0; i < state.getInitSquaresQuantity(); i += 1) {
    board.addSquare(getRandNum())
  }
  updateGameStatus()
  storage.saveAll()
}

export function initNewGame() {
  board.clear()
  state.resetScore()
  state.closeMessages()
  initGame()
}

export function loadGameFromLs(lsData) {
  lsData.squares.forEach((square) => board.addSquare(square.value, square.position))
  state.setScore(lsData.score)
  state.setSoundStatus(lsData.soundStatus)
  updateGameStatus()
  storage.saveAll()
}

export function initMove(e) {
  const posKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  posKey.forEach((key) => {
    if (e.key === key) startMove(key)
  })
}

export function listenSwipe() {
  const swipeArea = state.getRefs().table
  const hammerTime = new Hammer(swipeArea)
  hammerTime.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
    pointers: 1
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

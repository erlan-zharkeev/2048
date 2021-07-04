// eslint-disable-next-line import/no-cycle
import { startMove } from './table'

export function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getRandNum() {
  return randomizer(0, 2) === 0 ? 2 : 4
}

export function createSquare(e) {
  const posKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  posKey.forEach((key) => {
    if (e.key === key) startMove(key)
  })
}

document.addEventListener('keyup', createSquare)
const game = document.querySelector('.table')

// eslint-disable-next-line no-undef
const hammerTime = new Hammer(game)
hammerTime.get('swipe').set({
  // eslint-disable-next-line no-undef
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

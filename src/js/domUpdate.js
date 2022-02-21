import Square from './square'
import { version } from '../../package.json'

export function setVersion() {
  const versionDom = global.$state.$refs().version
  versionDom.textContent = `v.${version}`
}

export function updateSoundIcon() {
  const icon = global.$state.$refs().soundIcon
  icon.className = global.$state.getSoundStatus() ? 'bg-sound' : 'bg-no-sound'
}

export function clearSquares() {
  global.$state.getUpdatedDomSquares().forEach((square) => {
    square.remove()
  })
}

export function loadSquares(squares) {
  squares.forEach((square) => {
    new Square(square.value, undefined, square.position)
  })
}

export function updateDomScore() {
  const score = global.$state.$refs().scoreEl
  score.textContent = global.$state.getScore()
}

export function toggleModal() {
  const body = global.$state.$refs().modalBody
  body.classList.toggle('hide')
}

export function closeAllMessages() {
  global.$state.$refs().messages.forEach((message) => {
    message.classList.add('hide')
  })
}

export function showMessage(inputMessage) {
  const message = document.querySelector(`.${inputMessage}`)
  message.classList.remove('hide')
}

export default null

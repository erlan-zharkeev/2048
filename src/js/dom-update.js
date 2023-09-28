import Square from './square'
import { version } from '../../package.json'
import { state } from './state'

export function setVersion() {
  const versionDom = state.getRefs().version
  versionDom.textContent = `v.${version}`
}

export function updateSoundIcon() {
  const icon = state.getRefs().soundIcon
  icon.className = state.getSoundStatus() ? 'bg-sound' : 'bg-no-sound'
}

export function clearSquares() {
  state.getUpdatedDomSquares().forEach((square) => {
    square.remove()
  })
}

export function loadSquares(squares) {
  squares.forEach((square) => new Square(square.value, null, square.position))
}

export function updateDomScore() {
  const score = state.getRefs().scoreEl
  score.textContent = state.getScore()
}

export function toggleModal() {
  const body = state.getRefs().modalBody
  body.classList.toggle('hide')
}

export function closeAllMessages() {
  state.getRefs().messages.forEach((message) => {
    message.classList.add('hide')
  })
}

export function showMessage(inputMessage) {
  const message = document.querySelector(`.${inputMessage}`)
  message.classList.remove('hide')
}
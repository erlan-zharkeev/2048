import Square from './square'
import { version } from '../../package.json'

export function setVersion() {
  const versionDom = window.$state.getRefs().version
  versionDom.textContent = `v.${version}`
}

export function updateSoundIcon() {
  const icon = window.$state.getRefs().soundIcon
  icon.className = window.$state.getSoundStatus() ? 'bg-sound' : 'bg-no-sound'
}

export function clearSquares() {
  window.$state.getUpdatedDomSquares().forEach((square) => {
    square.remove()
  })
}

export function loadSquares(squares) {
  squares.forEach((square) => {
    new Square(square.value, null, square.position)
  })
}

export function updateDomScore() {
  const score = window.$state.getRefs().scoreEl
  score.textContent = window.$state.score
}

export function toggleModal() {
  const body = window.$state.getRefs().modalBody
  body.classList.toggle('hide')
}

export function closeAllMessages() {
  window.$state.getRefs().messages.forEach((message) => {
    message.classList.add('hide')
  })
}

export function showMessage(inputMessage) {
  const message = document.querySelector(`.${inputMessage}`)
  message.classList.remove('hide')
}
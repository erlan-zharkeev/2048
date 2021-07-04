import { initGame } from './table'

import { Storage } from './localStorageSaver'

const settings = document.querySelector('.settings-icon')

export default settings

const settingsContent = document.querySelector('.settings-content')

settings.addEventListener('click', () => {
  settingsContent.classList.toggle('hide')
})

const newGameBtn = document.querySelector('.new-game-btn')
const newGameBtnInner = document.getElementById('new-game')
const continueBtn = document.getElementById('continue')

function newGame() {
  const squares = document.querySelectorAll('.square')
  squares.forEach((square) => {
    square.remove()
  })
  const score = document.querySelector('.score').querySelector('span')
  score.textContent = 0
  const loseMessage = document.querySelector('.lose')
  loseMessage.classList.add('hide')
  initGame()
  const lcStorage = new Storage()
  lcStorage.write()
}

newGameBtn.addEventListener('click', newGame)
newGameBtnInner.addEventListener('click', newGame)

function continueGame() {
  const winMessage = document.querySelector('.win')
  winMessage.classList.add('hide')
  const lcStorage = new Storage()
  lcStorage.write()
}

continueBtn.addEventListener('click', continueGame)

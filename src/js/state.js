import { updateSoundIcon, updateDomScore, showMessage } from './dom-update'

export class State {
  #soundStatus
  #score
  #initSquaresQuantity
  #transitionDuration
  #gameStatus
  #refs
  constructor(
    soundStatus = false,
    score = 0,
    initSquaresQuantity = 2,
    gameStatus = true,
    transitionDuration = 100,
  ) {
    this.#soundStatus = soundStatus
    this.#score = score
    this.#initSquaresQuantity = initSquaresQuantity
    this.#transitionDuration = transitionDuration
    this.#gameStatus = gameStatus

    this.#refs = {
      version: document.querySelector('.version'),
      table: document.querySelector('.table'),
      cells: document.querySelectorAll('.table__cell'),
      questionIcon: document.querySelector('.question-icon'),
      modalBody: document.querySelector('.question-content'),
      soundIcon: document.querySelector('#sound-icon'),
      newGameBtn: document.querySelector('.new-game-btn'),
      resetGameBtn: document.querySelector('#reset-game-btn'),
      continueBtn: document.querySelector('#continue-btn'),
      scoreEl: document.querySelector('#scoreNum'),
      messages: document.querySelectorAll('.message'),
    }
  }

  getRefs() {
    return this.#refs
  }

  getTransitionDuration () {
    return this.#transitionDuration
  }

  getInitSquaresQuantity () {
    return this.#initSquaresQuantity
  }

  getSoundStatus() {
    return this.#soundStatus
  }

  getScore() {
    return this.#score
  }


  setSoundStatus(val) {
    this.#soundStatus = val
    updateSoundIcon()
  }

  toggleSoundStatus() {
    this.#soundStatus = !this.#soundStatus
    updateSoundIcon()
  }

  setScore(val) {
    console.log(val)
    this.#score = val
    updateDomScore()
  }

  resetScore() {
    this.#score = 0
    updateDomScore()
  }

  addScoreValue(val) {
    console.log(val)
    this.#score += Number(val)
    updateDomScore()
  }

  setGameStatus(value) {
    this.#gameStatus = value
    this.#gameStatus ? showMessage('win') : showMessage('lose')
  }

  getUpdatedDomSquares() {
    return document.querySelectorAll('.square')
  }

  getSquaresMap() {
    const result = []
    this.getUpdatedDomSquares().forEach((square) => {
      if (square.classList.contains('clone')) return
      result.push({ value: square.textContent, position: square.id })
    })
    return result
  }

  areAllMessagesClosed() {
    return Array.from(this.getRefs().messages).every((elem) =>
      elem.classList.contains('hide')
    )
  }
}

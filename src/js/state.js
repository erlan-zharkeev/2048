import { updateSoundIcon, updateDomScore, showMessage } from './dom-update'

export default class State {
  constructor(
    soundStatus = false,
    score = 0,
    initSquaresQuantity = 2,
    gameStatus = true,
    transitionDuration = 100
  ) {
    this._soundStatus = soundStatus
    this._score = score
    this._initSquaresQuantity = initSquaresQuantity
    this._gameStatus = gameStatus
    this._transitionDuration = transitionDuration

    this._refs = {
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

  setSoundStatus(val) {
    this._soundStatus = val
    updateSoundIcon()
  }

  toggleSoundStatus() {
    this._soundStatus = !this._soundStatus
    updateSoundIcon()
  }

  setScore(val) {
    this._score = val
    updateDomScore()
  }

  resetScore() {
    this._score = 0
    updateDomScore()
  }

  addScoreValue(value) {
    this._score += Number(value)
    updateDomScore()
  }

  setGameStatus(value) {
    this._gameStatus = value
    this._gameStatus ? showMessage('win') : showMessage('lose')
  }

  $refs() {
    return this._refs
  }

  getSoundStatus() {
    return this._soundStatus
  }

  getScore() {
    return this._score
  }

  getInitSquaresQuantity() {
    return this._initSquaresQuantity
  }

  getGameStatus() {
    return this._gameStatus
  }

  getUpdatedDomSquares() {
    return document.querySelectorAll('.square')
  }

  getTransitionDuration() {
    return this._transitionDuration
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
    return Array.from(this.$refs().messages).every((elem) =>
      elem.classList.contains('hide')
    )
  }
}

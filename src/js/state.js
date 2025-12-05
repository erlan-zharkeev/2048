class State {
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
    transitionDuration = 100
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
      soundToggle: document.querySelector('#sound-toggle'),
      soundIcon: document.querySelector('#sound-icon'),
      newGameBtn: document.querySelector('.new-game-btn'),
      resetGameBtn: document.querySelector('#reset-game-btn'),
      continueBtn: document.querySelector('#continue-btn'),
      scoreEl: document.querySelector('#scoreNum'),
      messages: document.querySelectorAll('.message')
    }
  }

  #updateSoundIcon() {
    const icon = this.getRefs().soundIcon
    icon.className = this.getSoundStatus() ? 'bg-sound' : 'bg-no-sound'
    const toggle = this.getRefs().soundToggle
    if (toggle) {
      toggle.setAttribute('data-state', this.getSoundStatus() ? 'on' : 'off')
      toggle.setAttribute('aria-pressed', this.getSoundStatus())
    }
  }

  #updateDomScore() {
    const score = this.getRefs().scoreEl
    score.textContent = this.getScore()
  }

  #showMessage(inputMessage) {
    const message = document.querySelector(`.${inputMessage}`)
    message.classList.remove('hide')
  }

  getRefs() {
    return this.#refs
  }

  getTransitionDuration() {
    return this.#transitionDuration
  }

  getInitSquaresQuantity() {
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
    this.#updateSoundIcon()
  }

  toggleSoundStatus() {
    this.#soundStatus = !this.#soundStatus
    this.#updateSoundIcon()
  }

  setScore(val) {
    this.#score = Number(val)
    this.#updateDomScore()
  }

  resetScore() {
    this.#score = 0
    this.#updateDomScore()
  }

  addScoreValue(val) {
    this.#score += Number(val)
    this.#updateDomScore()
  }

  setGameStatus(value) {
    this.#gameStatus = value
    this.#gameStatus ? this.#showMessage('win') : this.#showMessage('lose')
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
    return Array.from(this.getRefs().messages).every((elem) => elem.classList.contains('hide'))
  }
}

export const state = new State()

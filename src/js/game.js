import { storage } from './local-storage'
import { state } from './state'
import { isInternetExplorer } from './helpers'
import {
  loadGameFromLs, listenSwipe, initNewGame, initMove,
  initGame
} from './system'
import { version } from '../../package.json'

window.onload = () => {
  if (isInternetExplorer()) {
    const ie = document.querySelector('.IE')
    ie.classList.remove('hide')
    return
  }

  function closeAllMessages() {
    state.getRefs().messages.forEach((message) => {
      message.classList.add('hide')
    })
  }

  const lsData = storage.getLsData()
  lsData ? loadGameFromLs(lsData) : initGame()
  storage.saveAll()
  const versionDom = state.getRefs().version
  versionDom.textContent = `v.${version}`
  listenSwipe()

  const {
    soundToggle, soundIcon, newGameBtn, resetGameBtn, continueBtn, questionIcon, modalBody
  } = state.getRefs()

  const soundTarget = soundToggle || soundIcon

  soundTarget.addEventListener('click', () => {
    state.toggleSoundStatus()
    storage.save({ soundStatus: state.getSoundStatus() })
  })
  newGameBtn.addEventListener('click', initNewGame)
  resetGameBtn.addEventListener('click', () => {
    initNewGame()
    closeAllMessages()
  })
  continueBtn.addEventListener('click', closeAllMessages)
  questionIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    if (state.areAllMessagesClosed()) {
      const body = state.getRefs().modalBody
      body.classList.toggle('hide')
    }
  })
  window.addEventListener('click', () => {
    const isModalOpen = !modalBody.classList.contains('hide')
    if (isModalOpen) {
      modalBody.classList.add('hide')
    }
  })
  window.addEventListener('keydown', (e) => {
    const isEsc = e.key === 'Escape'
    const isModalOpen = !modalBody.classList.contains('hide')
    if (isEsc && isModalOpen) {
      modalBody.classList.add('hide')
    }
  })
  window.addEventListener('keyup', initMove)
}

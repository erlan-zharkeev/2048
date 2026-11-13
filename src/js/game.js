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

  const lsData = storage.getLsData()
  lsData ? loadGameFromLs(lsData) : initGame()
  const versionDom = state.getRefs().version
  versionDom.textContent = `v.${version}`
  listenSwipe()

  const {
    soundIcon, newGameBtn, resetGameBtn, continueBtn, questionIcon, modalBody
  } = state.getRefs()

  soundIcon.addEventListener('click', () => {
    state.toggleSoundStatus()
    storage.save({ soundStatus: state.getSoundStatus() })
  })
  newGameBtn.addEventListener('click', initNewGame)
  resetGameBtn.addEventListener('click', initNewGame)
  continueBtn.addEventListener('click', () => {
    continueBtn.closest('.message').classList.add('hide')
  })
  questionIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    if (state.areAllMessagesClosed()) {
      const body = state.getRefs().modalBody
      body.classList.toggle('hide')
    }
  })
  window.addEventListener('click', () => {
    const isModalOpen = !modalBody.classList.contains('hide')
    if (isModalOpen) modalBody.classList.add('hide')
  })
  window.addEventListener('keyup', initMove)
}

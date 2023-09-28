import {
  initGame,
  initNewGame,
  initMove,
  listenSwipe,
  loadGameFromLs,
} from './system'
import { storage } from './local-storage'
import { toggleModal, closeAllMessages, setVersion } from './dom-update'
import { state } from './state'

window.onload = () => {
  const lsData = storage.getLsData()
  lsData ? loadGameFromLs(lsData) : initGame()
  storage.saveAll()
  setVersion()
  listenSwipe()
  const { soundIcon, newGameBtn, resetGameBtn, continueBtn, questionIcon, modalBody } = state.getRefs()
  soundIcon.addEventListener('click', () => {
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
    if (state.areAllMessagesClosed()) toggleModal()
  })
  window.addEventListener('click', () => {
    const isModalOpen = !modalBody.classList.contains('hide')
    if (isModalOpen) modalBody.classList.add('hide')
  })
  window.addEventListener('keyup', initMove)
}

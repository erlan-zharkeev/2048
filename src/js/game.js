import {
  initGame,
  initNewGame,
  initMove,
  listenSwipe,
  loadGameFromLs,
} from './system'

import { toggleModal, closeAllMessages, setVersion } from './dom-update'

window.onload = () => {
  const lsData = window.$ls.getLsData()
  lsData ? loadGameFromLs(lsData) : initGame()
  window.$ls.saveAll()
  setVersion()
  listenSwipe()
  const { soundIcon, newGameBtn, resetGameBtn, continueBtn, questionIcon, modalBody } = window.$state.getRefs()
  soundIcon.addEventListener('click', () => {
    window.$state.toggleSoundStatus()
    window.$ls.save({ soundStatus: window.$state.getSoundStatus() })
  })
  newGameBtn.addEventListener('click', initNewGame)
  resetGameBtn.addEventListener('click', () => {
    initNewGame()
    closeAllMessages()
  })
  continueBtn.addEventListener('click', closeAllMessages)
  questionIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    if (window.$state.areAllMessagesClosed()) toggleModal()
  })
  window.addEventListener('click', () => {
    const isModalOpen = !modalBody.classList.contains('hide')
    if (isModalOpen) modalBody.classList.add('hide')
  })
  window.addEventListener('keyup', initMove)
}

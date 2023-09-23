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
  window.$state.getRefs().soundIcon.addEventListener('click', () => {
    window.$state.toggleSoundStatus()
    window.$ls.save({
      soundStatus: window.$state.getSoundStatus(),
    })
  })
  window.$state.getRefs().newGameBtn.addEventListener('click', initNewGame)
  window.$state.getRefs().resetGameBtn.addEventListener('click', () => {
    initNewGame()
    closeAllMessages()
  })
  window.$state.getRefs().continueBtn.addEventListener('click', closeAllMessages)
  window.$state.getRefs().questionIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    if (window.$state.areAllMessagesClosed()) toggleModal()
  })
  window.addEventListener('click', () => {
    const modal = window.$state.getRefs().modalBody
    const isModalOpen = !modal.classList.contains('hide')
    if (isModalOpen) modal.classList.add('hide')
  })
  window.addEventListener('keyup', initMove)
}

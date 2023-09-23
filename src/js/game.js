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
  window.$state.$refs().soundIcon.addEventListener('click', () => {
    window.$state.toggleSoundStatus()
    window.$ls.save({
      soundStatus: window.$state.getSoundStatus(),
    })
  })
  window.$state.$refs().newGameBtn.addEventListener('click', () => {
    initNewGame()
  })
  window.$state.$refs().resetGameBtn.addEventListener('click', () => {
    initNewGame()
    closeAllMessages()
  })
  window.$state.$refs().continueBtn.addEventListener('click', () => {
    closeAllMessages()
  })
  window.$state.$refs().questionIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    if (window.$state.areAllMessagesClosed()) toggleModal()
  })
  window.addEventListener('click', () => {
    const modal = window.$state.$refs().modalBody
    const isModalOpen = !modal.classList.contains('hide')
    if (isModalOpen) modal.classList.add('hide')
  })
  window.addEventListener('keyup', (e) => {
    initMove(e)
  })
}

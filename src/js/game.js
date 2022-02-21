import {
  initGame,
  initNewGame,
  initMove,
  listenSwipe,
  loadGameFromLs,
} from './system'

import { toggleModal, closeAllMessages } from './domUpdate'

global.onbeforeunload = () => {
  global.$ls.saveAll()
}

global.onload = () => {
  const lsData = global.$ls.getLsData()
  if (lsData) loadGameFromLs(lsData)
  else {
    initGame()
    global.$ls.saveAll()
  }
  listenSwipe()
  global.$state.$refs().soundIcon.addEventListener('click', () => {
    global.$state.toggleSoundStatus()
    global.$ls.save({
      soundStatus: global.$state.getSoundStatus(),
    })
  })
  global.$state.$refs().newGameBtn.addEventListener('click', () => {
    initNewGame()
  })
  global.$state.$refs().resetGameBtn.addEventListener('click', () => {
    initNewGame()
    closeAllMessages()
  })
  global.$state.$refs().continueBtn.addEventListener('click', () => {
    closeAllMessages()
  })
  global.$state.$refs().questionIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    if (global.$state.areAllMessagesClosed()) toggleModal()
  })
  global.addEventListener('click', () => {
    const modal = global.$state.$refs().modalBody
    const isModalOpen = !modal.classList.contains('hide')
    if (isModalOpen) modal.classList.add('hide')
  })
  global.addEventListener('keyup', (e) => {
    initMove(e)
  })
}

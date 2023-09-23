import './assets/styles/style.sass'
import './js/ie-hider'
import './js/game'
import State from './js/state'
import LocalStorage from './js/local-storage'
window.$ls = new LocalStorage()
window.$state = new State()

import './assets/styles/style.sass'
import './js/ieHider'
import './js/game'
import State from './js/state'
import LocalStorage from './js/localStorage'
window.$ls = new LocalStorage()
window.$state = new State()

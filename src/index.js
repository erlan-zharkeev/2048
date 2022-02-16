/* eslint-disable import/first */
if (process.env.NODE_ENV === 'production') console.log = function () {}
import './assets/sass/style.sass'
import './js/ieHider'
import './js/table'
import './js/gameControls'
import './js/localStorageSaver'

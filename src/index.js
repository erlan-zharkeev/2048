import './assets/styles/style.scss'
import './js/game'

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  navigator.serviceWorker.register('./sw.js')
    .catch(err => console.error('SW registration failed', err));
}
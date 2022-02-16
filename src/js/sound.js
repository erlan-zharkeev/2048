import { Howl } from 'howler'

let soundActive = false
export class Sound {
  constructor(sound) {
    this._sound = new Howl({
      src: [`../assets/audio/${sound}.mp3`],
      volume: 0.3,
    })
    if (soundActive) this._sound.play()
  }
}

const basePath = process.env.NODE_ENV === 'development' ? '../assets/audio' : './assets/audio'
export const moveSound = new Howl({
  src: [`${basePath}/move.mp3`],
})
export const mergeSound = new Howl({
  src: [`${basePath}/merge.mp3`],
})

const icon = document.querySelector('#sound-icon')

function toggleSound() {
  soundActive = !soundActive
  if (icon.className === 'bg-no__sound') icon.className = 'bg-sound'
  else icon.className = 'bg-no__sound'
}

icon.addEventListener('click', toggleSound)

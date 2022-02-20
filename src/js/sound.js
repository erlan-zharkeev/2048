import { Howl } from 'howler'

export class Sound {
  constructor(sound) {
    this._sound = new Howl({
      src: [`./assets/audio/${sound}.mp3`],
      volume: 0.3
    })
    if (global.$state.getSoundStatus()) this._sound.play()
  }
}
export default null

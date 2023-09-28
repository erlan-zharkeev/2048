import { Howl } from 'howler'
import { state } from './state'

export function sound (sampleName) {
  const sound =  new Howl({
    src: [`./assets/audio/${sampleName}.mp3`],
    volume: 0.3,
  })
  if (state.getSoundStatus()) sound.play()
}
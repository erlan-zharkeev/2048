import { Howl } from 'howler'

export function sound (sampleName) {
  const sound =  new Howl({
    src: [`./assets/audio/${sampleName}.mp3`],
    volume: 0.3,
  })
  if (window.$state.getSoundStatus()) sound.play()
}
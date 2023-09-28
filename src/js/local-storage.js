import { state } from './state'
class LocalStorage {
  saveAll() {
    const data = {
      squares: state.getSquaresMap(),
      score: state.getScore(),
      soundStatus: state.getSoundStatus(),
    }
    this.save(data)
  }

  save(data) {
    const currentData = this.getLsData() ? this.getLsData() : {}
    Object.entries(data).forEach(([key, val]) => {
      currentData[key] = val
    })
    const stringifiedData = JSON.stringify(currentData)
    localStorage.setItem('2048', stringifiedData)
  }

  getLsData() {
    const data = localStorage.getItem('2048')
    return JSON.parse(data)
  }
}

export const storage = new LocalStorage()

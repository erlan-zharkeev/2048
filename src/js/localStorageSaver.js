/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle
import { Square } from './table'

export class Storage {
  _getData() {
    this._data = []
    this._score = document
      .querySelector('.score')
      .querySelector('span').textContent
    this._squares = document.querySelectorAll('.square')
    this._data.push(this._score)
    this._squares.forEach((sq) => {
      const subArr = []
      subArr.push(sq.textContent, sq.id)
      this._data.push(subArr)
    })
    return this._data
  }

  write() {
    const data = this._getData()
    const string = this._stringify(data)
    localStorage.setItem('2048', string)
  }

  _stringify(data) {
    return JSON.stringify(data)
  }

  _parse(data) {
    return JSON.parse(data)
  }

  read() {
    const data = localStorage.getItem('2048')
    const arr = this._parse(data)
    this._updateData(arr)
  }

  _updateData(arr) {
    this._score = document.querySelector('#scoreNum')
    this._score.textContent = arr.shift()
    arr.forEach((sq) => {
      new Square(sq[0], undefined, sq[1])
    })
  }
}

window.onload = () => {
  const lcStorage = new Storage()
  if (localStorage[2048]) lcStorage.read()
}

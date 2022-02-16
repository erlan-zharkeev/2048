// eslint-disable-next-line import/no-cycle
import { randomizer, getRandNum } from './initMove'

// eslint-disable-next-line import/no-cycle
import { Storage } from './localStorageSaver'

import { Sound } from './sound'

const transitionDuration = 100

let gameStatus = false

export class Square {
  constructor(num, dir, id) {
    this._num = num
    this._dir = dir
    this._squaresArr = []
    this._table = document.querySelector('.table')
    this._square = this._create()
    this._squares = document.querySelectorAll('.square')
    this._clearMerged()
    this._colorChange(this._num, this._square)
    if (this._dir) this._initAction()
    else this._append(id)
    this._saveLocal()
  }

  _initAction() {
    this._squaresArr = this._getSquareArr()
    this._clearNewClass(this._squaresArr)
    if (!this._findFreePos()) this._checkForLose()
    this._prepForMove()
    if (gameStatus) {
      new Sound('move')
      this._append()
      gameStatus = false
    }
  }

  _saveLocal() {
    new Storage().write()
  }

  _checkForLose() {
    let hasStep = false
    this._squaresArr = this._getSquareArr()
    this._squaresArr.forEach((sq) => {
      const cells = this._getAllPosCoords(sq.id)
      cells.forEach((cell) => {
        const innerSquare = cell.querySelector('.square')
        const isEqual = innerSquare?.textContent === sq.textContent
        if (!innerSquare || (isEqual && cells.length > 2)) {
          hasStep = true
        }
      })
    })
    if (!hasStep) this._showMessage('lose')
  }

  _showMessage(inputMessage) {
    const message = document.querySelector(`.${inputMessage}`)
    message.classList.remove('hide')
  }

  _getAllPosCoords(coords) {
    const arr = []
    const cells = []
    const posY = Number(coords[0])
    const posX = Number(coords[2])
    if (posY !== 4) arr.push(`${posY + 1}-${posX}`)
    if (posY !== 0) arr.push(`${posY - 1}-${posX}`)
    if (posX !== 4) arr.push(`${posY}-${posX + 1}`)
    if (posX !== 0) arr.push(`${posY}-${posX - 1}`)
    arr.forEach((coord) => {
      const cell = this._table.querySelector(`.table__cell[id="${coord}"]`)
      if (cell) cells.push(cell)
    })
    return cells
  }

  _clearNewClass(arr) {
    arr.forEach((sq) => {
      sq.classList.remove('new')
    })
  }

  _prepForMove() {
    this._squaresArr.forEach((el, index) => {
      const square = this._getSquareArr()[index]
      const startCoords = square.id.split('-')
      this._getNextCell(this._dir, startCoords, square)
    })
  }

  _clearMerged() {
    this._squares.forEach((square) => {
      square.classList.remove('merged')
    })
  }

  _checkForMerge(cell, square) {
    const contSquare = cell.querySelector('.square')
    if (contSquare && contSquare.textContent === square.textContent) {
      return true
    }
    return false
  }

  _moveTo(cell, square, innerSquare, direct) {
    if (cell.id !== square.id) {
      gameStatus = true
      const clone = this._createClone(square)
      const startPosClone = this._getStartClonePos(square)
      this._addClone(clone, startPosClone)
      this._addOriginal(cell, square)
      this._moveClone(cell, clone, startPosClone, direct)

      setTimeout(() => {
        clone.remove()
      }, transitionDuration)

      if (innerSquare) this._merge(square, innerSquare)
    }
  }

  _createClone(square) {
    const clone = square.cloneNode(true)
    clone.classList.add('clone')

    const { width } = square.getBoundingClientRect()
    clone.style.width = `${width}px`
    clone.style.height = `${width}px`
    return clone
  }

  _getStartClonePos(square) {
    const startPosY = square.getBoundingClientRect().top
    const startPosX = square.getBoundingClientRect().left
    return [startPosY, startPosX]
  }

  _addClone(clone, startPosClone) {
    clone.style.top = `${startPosClone[0]}px`
    clone.style.left = `${startPosClone[1]}px`
    document.body.append(clone)
  }

  _moveClone(cell, clone, startPosClone, direct) {
    const border = parseInt(getComputedStyle(this._table).borderTopWidth)

    const endPosY = cell.getBoundingClientRect().top + border
    const endPosX = cell.getBoundingClientRect().left + border

    if (direct === 'ArrowUp' || direct === 'ArrowDown') {
      clone.style.transform = `translate(0px,${endPosY - startPosClone[0]}px)`
    } else {
      clone.style.transform = `translate(${endPosX - startPosClone[1]}px,0px)`
    }
  }

  _addOriginal(cell, square) {
    square.classList.add('hide')
    cell.append(square)
    square.id = cell.id
    setTimeout(() => {
      square.classList.remove('hide')
    }, transitionDuration / 2.5)
  }

  _merge(square, innerSquare) {
    new Sound('merge')
    innerSquare.remove()
    square.textContent = Number(square.textContent) * 2
    if (square.textContent === '2048') this._showMessage('win')
    square.classList.add(`s${square.textContent}`, 'merged')
    this._scoreUpdate(square.textContent)
  }

  _scoreUpdate(num) {
    const score = document.querySelector('#scoreNum')
    score.textContent = Number(score.textContent) + Number(num)
  }

  _isCellFree(coords, posY, posX, square, value) {
    const cell = this._table.querySelector(`.table__cell[id="${coords}"]`)
    if (!cell.hasChildNodes()) {
      this._getNextCell(this._dir, `${posY}${posX}`, square)
    } else if (cell.hasChildNodes()) {
      const innerSquare = cell.querySelector('.square')
      if (
        innerSquare.textContent === value
        && !innerSquare.classList.contains('merged')
      ) {
        this._moveTo(cell, square, innerSquare, this._dir)
      } else {
        this._corrMov(this._dir, `${posY}${posX}`, square)
      }
    }
  }

  _corrMov(direction, coords, square) {
    let posY = Number(coords[0])
    let posX = Number(coords[1])
    let coordinate
    switch (direction) {
      case 'ArrowDown':
        posY -= 1
        coordinate = `${posY}-${posX}`
        break
      case 'ArrowUp':
        posY += 1
        coordinate = `${posY}-${posX}`
        break
      case 'ArrowLeft':
        posX += 1
        coordinate = `${posY}-${posX}`
        break
      case 'ArrowRight':
        posX -= 1
        coordinate = `${posY}-${posX}`
        break
      default:
        break
    }
    const cell = this._table.querySelector(`.table__cell[id="${coordinate}"]`)
    this._moveTo(cell, square, false, direction)
  }

  _getNextCell(direction, startCoords, square) {
    const value = square.textContent
    let coords
    let posY = Number(startCoords[0])
    let posX = Number(startCoords[1])
    coords = `${posY}-${posX}`
    switch (direction) {
      case 'ArrowDown':
        if (posY !== 4) {
          posY += 1
          coords = `${posY}-${posX}`
          this._isCellFree(coords, posY, posX, square, value)
        } else {
          const cell = this._table.querySelector(`.table__cell[id="${coords}"]`)
          this._moveTo(cell, square, false, direction)
        }
        break
      case 'ArrowUp':
        if (posY !== 1) {
          posY -= 1
          coords = `${posY}-${posX}`
          this._isCellFree(coords, posY, posX, square, value)
        } else {
          const cell = this._table.querySelector(`.table__cell[id="${coords}"]`)
          this._moveTo(cell, square, false, direction)
        }
        break
      case 'ArrowLeft':
        if (posX !== 1) {
          posX -= 1
          coords = `${posY}-${posX}`
          this._isCellFree(coords, posY, posX, square, value)
        } else {
          const cell = this._table.querySelector(`.table__cell[id="${coords}"]`)
          this._moveTo(cell, square, false, direction)
        }
        break
      case 'ArrowRight':
        if (posX !== 4) {
          posX += 1
          coords = `${posY}-${posX}`
          this._isCellFree(coords, posY, posX, square, value)
        } else {
          const cell = this._table.querySelector(`.table__cell[id="${coords}"]`)
          this._moveTo(cell, square, false, direction)
        }
        break
      default:
        break
    }
  }

  _getSquareArr() {
    let result = []
    const arr = Array.prototype.slice.call(this._squares, 0)
    switch (this._dir) {
      case 'ArrowUp':
        for (let i = this._squares.length - 1; i >= 0; i -= 1) {
          result.unshift(this._squares[i])
        }
        break
      case 'ArrowDown':
        for (let i = this._squares.length - 1; i >= 0; i -= 1) {
          result.push(this._squares[i])
        }
        break
      case 'ArrowLeft':
        arr.sort((a, b) => {
          const x = a.id.substr(2, 1)
          const y = b.id.substr(2, 1)
          if (x > y) return 1
          if (x < y) return -1
          return 0
        })
        result = arr
        break
      case 'ArrowRight':
        arr.sort((a, b) => {
          const x = a.id.substr(2, 1)
          const y = b.id.substr(2, 1)
          if (x < y) return 1
          if (x > y) return -1
          return 0
        })
        result = arr
        break
      default:
        break
    }
    return result
  }

  _findFreePos() {
    const freeCells = []
    if (this._cells) {
      this._cells.forEach((cell) => {
        if (cell.childNodes.length === 0) freeCells.push(cell)
      })
    }
    return freeCells[randomizer(0, freeCells.length)]
  }

  _create() {
    const square = document.createElement('div')
    square.classList.add('square')
    square.textContent = this._num
    return square
  }

  _colorChange(num, square) {
    square.classList.add(`s${num}`)
  }

  _append(id) {
    this._cells = document.querySelectorAll('.table__cell')
    if (!id) {
      this._freeCell = this._findFreePos()
      if (this._freeCell.id) {
        this._square.id = this._freeCell.id
        this._freeCell.append(this._square)
        this._square.classList.add('new')
      }
    } else {
      const target = this._table.querySelector(`.table__cell[id="${id}"]`)
      this._square.id = target.id
      this._square.classList.add('new')
      target.append(this._square)
    }
  }
}

export function initGame() {
  new Square(getRandNum())
  new Square(getRandNum())
}

export function startMove(dir) {
  new Square(getRandNum(), dir)
}

if (!localStorage[2048]) initGame()

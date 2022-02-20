import { randomizer } from './helpers'
import { Sound } from './sound'

export default class Square {
  constructor(num, dir, id) {
    this._table = global.$state.$refs().table
    this._cells = global.$state.$refs().cells
    this._hasNextStep = true
    this._num = num
    this._dir = dir
    this._squaresArr = []
    this._square = this._getNewSquare()
    this._squares = global.$state.getUpdatedDomSquares()
    this._clearClass(this._squares, 'merged')
    this._sortSquaresArr()
    if (this._dir) this._initAction()
    else this._append(id)
  }

  _initAction() {
    if (this._hasNextStep) {
      this._clearClass(this._squaresArr, 'new')
      this._prepForMove()
      new Sound('move')
      this._append()
    }
    if (!this._getFreePos()) {
      this._checkForLose()
    }
  }

  _checkForLose() {
    const allPossibleMove = []
    this._squaresArr.forEach((square) => {
      const posCoords = this._getAllPosCoords(square.id)
      const hasNextStep = this._squareHasNextStep(posCoords, square.textContent)
      allPossibleMove.push(hasNextStep)
    })
    this._hasNextStep = !allPossibleMove.every((el) => el === false)
    if (!this._hastNextStep) global.$state.setGameStatus(false)
  }

  _squareHasNextStep(coordsArr, checkValue) {
    const valuesArr = []
    coordsArr.forEach((cell) => {
      const innerSquare = cell.querySelector('.square')
      const isEqual = innerSquare.textContent === checkValue
      if (!innerSquare || isEqual) valuesArr.push('has')
    })
    return !!valuesArr.length
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

  _clearClass(arr, className) {
    arr.forEach((el) => {
      el.classList.remove(className)
    })
  }

  _prepForMove() {
    this._squaresArr.forEach((square) => {
      const startCoords = square.id.split('-')
      this._getNextCell(this._dir, startCoords, square)
    })
  }

  _checkForMerge(cell, square) {
    const contSquare = cell.querySelector('.square')
    return contSquare?.textContent === square.textContent
  }

  _moveTo(cell, square, innerSquare, direct) {
    if (cell.id !== square.id) {
      const clone = this._createClone(square)
      const startPosClone = this._getStartClonePos(square)
      this._addClone(clone, startPosClone)
      this._addOriginal(cell, square)
      this._moveClone(cell, clone, startPosClone, direct)

      setTimeout(() => {
        clone.remove()
      }, global.$state.getTransitionDuration())

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

    const isYAxis = direct === 'ArrowUp' || direct === 'ArrowDown'
    const yAxisMoveStyle = `translate(0px,${endPosY - startPosClone[0]}px)`
    const xAxisMoveStyle = `translate(${endPosX - startPosClone[1]}px,0px)`
    clone.style.transform = isYAxis ? yAxisMoveStyle : xAxisMoveStyle
  }

  _addOriginal(cell, square) {
    square.classList.add('hide')
    cell.append(square)
    square.id = cell.id
    setTimeout(() => {
      square.classList.remove('hide')
    }, global.$state.getTransitionDuration() / 2.5)
  }

  _merge(square, innerSquare) {
    new Sound('merge')
    innerSquare.remove()
    square.textContent = Number(square.textContent) * 2
    if (square.textContent === '2048') global.$state.setGameStatus(true)
    square.classList.add(`s${square.textContent}`, 'merged')
    global.$state.addScoreValue(square.textContent)
  }

  _isCellFree(coords, posY, posX, square, value) {
    const cell = this._table.querySelector(`.table__cell[id="${coords}"]`)
    if (cell.hasChildNodes()) {
      const innerSquare = cell.querySelector('.square')
      const isContentEqual = innerSquare.textContent === value
      const isNotMerged = !innerSquare.classList.contains('merged')
      if (isContentEqual && isNotMerged) {
        this._moveTo(cell, square, innerSquare, this._dir)
      } else this._corrMov(this._dir, `${posY}${posX}`, square)
      return
    }
    this._getNextCell(this._dir, `${posY}${posX}`, square)
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

  _sortSquaresArr() {
    let result = []
    const convertedArr = Array.from(this._squares)
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
        convertedArr.sort((a, b) => {
          const x = a.id.substr(2, 1)
          const y = b.id.substr(2, 1)
          if (x > y) return 1
          if (x < y) return -1
          return 0
        })
        result = convertedArr
        break
      case 'ArrowRight':
        convertedArr.sort((a, b) => {
          const x = a.id.substr(2, 1)
          const y = b.id.substr(2, 1)
          if (x < y) return 1
          if (x > y) return -1
          return 0
        })
        result = convertedArr
        break
      default:
        break
    }
    this._squaresArr = result
  }

  _getFreePos() {
    const freeCells = []
    this._cells.forEach((cell) => {
      if (cell.childNodes.length === 0) freeCells.push(cell)
    })
    return freeCells[randomizer(0, freeCells.length)]
  }

  _getNewSquare() {
    const square = document.createElement('div')
    square.classList.add('square')
    square.textContent = this._num
    square.classList.add(`s${this._num}`)
    return square
  }

  _append(id = null) {
    if (id) {
      const target = this._table.querySelector(`.table__cell[id="${id}"]`)
      this._square.id = target.id
      this._square.classList.add('new')
      target.append(this._square)
    } else {
      this._freeCell = this._getFreePos()
      this._square.id = this._freeCell.id
      this._freeCell.append(this._square)
      this._square.classList.add('new')
    }
  }
}

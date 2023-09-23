import { randomizer } from './helpers'
import { sound } from './sound'

export default class Square {
  #table
  #cells
  #hasNextStep
  #num
  #dir
  #sortedSquares
  #square
  #squares
  constructor(num, dir, id) {
    this.#table = window.$state.getRefs().table
    this.#cells = window.$state.getRefs().cells
    this.#hasNextStep = true
    this.#num = num
    this.#dir = dir
    this.#sortedSquares = []
    this.#square = this.#getNewSquare()
    this.#squares = window.$state.getUpdatedDomSquares()
    this.#clearClass(this.#squares, 'merged')
    this.#sortSquaresArr()
    this.#dir ? this.#initAction() : this.#append(id)
  }

  #initAction() {
    if (this.#hasNextStep) {
      this.#clearClass(this.#sortedSquares, 'new')
      this.#prepForMove()
      sound('move')
      this.#append()
    }
    if (!this.#getFreePos()) this.#checkForLose()
  }

  #checkForLose() {
    const allPossibleMove = []
    this.#sortedSquares.forEach((square) => {
      const posCoords = this.#getAllPosCoords(square.id)
      const hasNextStep = this.#squareHasNextStep(posCoords, square.textContent)
      allPossibleMove.push(hasNextStep)
    })
    this.#hasNextStep = allPossibleMove.some((el) => el)
    if (!this.#hasNextStep) window.$state.setGameStatus(false)
  }

  #squareHasNextStep(coordsArr, checkValue) {
    const valuesArr = []
    coordsArr.forEach((cell) => {
      const innerSquare = cell.querySelector('.square')
      const isEqual = innerSquare.textContent === checkValue
      if (!innerSquare || isEqual) valuesArr.push('has')
    })
    return !!valuesArr.length
  }

  #getAllPosCoords(coords) {
    const arr = []
    const cells = []
    const posY = Number(coords[0])
    const posX = Number(coords[2])
    if (posY !== 4) arr.push(`${posY + 1}-${posX}`)
    if (posY !== 0) arr.push(`${posY - 1}-${posX}`)
    if (posX !== 4) arr.push(`${posY}-${posX + 1}`)
    if (posX !== 0) arr.push(`${posY}-${posX - 1}`)
    arr.forEach((coord) => {
      const cell = this.#table.querySelector(`.table__cell[id="${coord}"]`)
      if (cell) cells.push(cell)
    })
    return cells
  }

  #clearClass(arr, className) {
    arr.forEach((el) => {
      el.classList.remove(className)
    })
  }

  #prepForMove() {
    this.#sortedSquares.forEach((square) => {
      const startCoords = square.id.split('-')
      this.#getNextCell(this.#dir, startCoords, square)
    })
  }

  #moveTo(cell, square, innerSquare, direct) {
    if (cell.id !== square.id) {
      const clone = this.#createClone(square)
      const startPosClone = this.#getStartClonePos(square)
      this.#addClone(clone, startPosClone)
      this.#addOriginal(cell, square)
      this.#moveClone(cell, clone, startPosClone, direct)

      const timerId = setTimeout(() => {
        clone.remove()
        timerId = null
      }, window.$state.getTransitionDuration())

      if (innerSquare) this.#merge(square, innerSquare)
    }
  }

  #createClone(square) {
    const clone = square.cloneNode(true)
    clone.classList.add('clone')

    const { width } = square.getBoundingClientRect()
    clone.style.width = `${width}px`
    clone.style.height = `${width}px`
    return clone
  }

  #getStartClonePos(square) {
    const startPosY = square.getBoundingClientRect().top
    const startPosX = square.getBoundingClientRect().left
    return [startPosY, startPosX]
  }

  #addClone(clone, startPosClone) {
    clone.style.top = `${startPosClone[0]}px`
    clone.style.left = `${startPosClone[1]}px`
    document.body.append(clone)
  }

  #moveClone(cell, clone, startPosClone, direct) {
    const border = parseInt(getComputedStyle(this.#table).borderTopWidth)

    const endPosY = cell.getBoundingClientRect().top + border
    const endPosX = cell.getBoundingClientRect().left + border

    const isYAxis = direct === 'ArrowUp' || direct === 'ArrowDown'
    const yAxisMoveStyle = `translate(0px,${endPosY - startPosClone[0]}px)`
    const xAxisMoveStyle = `translate(${endPosX - startPosClone[1]}px,0px)`
    clone.style.transform = isYAxis ? yAxisMoveStyle : xAxisMoveStyle
  }

  #addOriginal(cell, square) {
    square.classList.add('hide')
    cell.append(square)
    square.id = cell.id
    const timerId = setTimeout(() => {
      square.classList.remove('hide')
    }, window.$state.getTransitionDuration())
    timerId = null
  }

  #merge(square, innerSquare) {
    sound('merge')
    innerSquare.remove()
    square.textContent = Number(square.textContent) * 2
    if (square.textContent === '2048') window.$state.setGameStatus(true)
    square.classList.add(`s${square.textContent}`, 'merged')
    window.$state.addScoreValue(square.textContent)
  }

  #isCellFree(coords, posY, posX, square, value) {
    const cell = this.#table.querySelector(`.table__cell[id="${coords}"]`)
    if (cell.hasChildNodes()) {
      const innerSquare = cell.querySelector('.square')
      const isContentEqual = innerSquare.textContent === value
      const isNotMerged = !innerSquare.classList.contains('merged')
      if (isContentEqual && isNotMerged) {
        this.#moveTo(cell, square, innerSquare, this.#dir)
      } else this.#corrMov(this.#dir, `${posY}${posX}`, square)
      return
    }
    this.#getNextCell(this.#dir, `${posY}${posX}`, square)
  }

  #corrMov(direction, coords, square) {
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
    const cell = this.#table.querySelector(`.table__cell[id="${coordinate}"]`)
    this.#moveTo(cell, square, false, direction)
  }

  #getNextCell(direction, startCoords, square) {
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
          this.#isCellFree(coords, posY, posX, square, value)
        } else {
          const cell = this.#table.querySelector(`.table__cell[id="${coords}"]`)
          this.#moveTo(cell, square, false, direction)
        }
        break
      case 'ArrowDown':
        if (posY !== 4) {
          posY += 1
          coords = `${posY}-${posX}`
          this.#isCellFree(coords, posY, posX, square, value)
        } else {
          const cell = this.#table.querySelector(`.table__cell[id="${coords}"]`)
          this.#moveTo(cell, square, false, direction)
        }
        break
      case 'ArrowLeft':
        if (posX !== 1) {
          posX -= 1
          coords = `${posY}-${posX}`
          this.#isCellFree(coords, posY, posX, square, value)
        } else {
          const cell = this.#table.querySelector(`.table__cell[id="${coords}"]`)
          this.#moveTo(cell, square, false, direction)
        }
        break
      case 'ArrowRight':
        if (posX !== 4) {
          posX += 1
          coords = `${posY}-${posX}`
          this.#isCellFree(coords, posY, posX, square, value)
        } else {
          const cell = this.#table.querySelector(`.table__cell[id="${coords}"]`)
          this.#moveTo(cell, square, false, direction)
        }
        break
      default:
        break
    }
  }

  #sortSquaresArr() {
    let result = []
    const convertedArr = Array.from(this.#squares)
    switch (this.#dir) {
      case 'ArrowUp':
        for (let i = this.#squares.length - 1; i >= 0; i -= 1) {
          result.unshift(this.#squares[i])
        }
        break
      case 'ArrowDown':
        for (let i = this.#squares.length - 1; i >= 0; i -= 1) {
          result.push(this.#squares[i])
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
    this.#sortedSquares = result
  }

  #getFreePos() {
    const freeCells = []
    this.#cells.forEach((cell) => {
      if (cell.childNodes.length === 0) freeCells.push(cell)
    })
    return freeCells[randomizer(0, freeCells.length)]
  }

  #getNewSquare() {
    const square = document.createElement('div')
    square.classList.add('square')
    square.textContent = this.#num
    square.classList.add(`s${this.#num}`)
    return square
  }

  #append(id = null) {
    if (id) {
      const target = this.#table.querySelector(`.table__cell[id="${id}"]`)
      this.#square.id = target.id
      this.#square.classList.add('new')
      target.append(this.#square)
    } else {
      const freeCell = this.#getFreePos()
      this.#square.id = freeCell.id
      freeCell.append(this.#square)
      this.#square.classList.add('new')
    }
    window.$ls.save({
      squares: window.$state.getSquaresMap(),
      score: window.$state.getScore(),
    })
  }
}

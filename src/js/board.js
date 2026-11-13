import { Howl } from 'howler'
import { randomizer } from './helpers'
import { state } from './state'

export function sound(sampleName) {
  const currentSound = new Howl({
    src: [`./assets/audio/${sampleName}.mp3`],
    volume: 0.3
  })
  if (state.getSoundStatus()) currentSound.play()
}

export class Board {
  #table

  #cells

  #dir

  #sortedSquares

  #squares

  #hasMoved

  #animationTimeout

  constructor() {
    this.#table = state.getRefs().table
    this.#cells = state.getRefs().cells
  }

  move(direction) {
    this.#finishAnimations()
    this.#dir = direction
    this.#hasMoved = false
    this.#squares = state.getUpdatedDomSquares()
    this.#clearClass(this.#squares, 'merged')
    this.#clearClass(this.#squares, 'new')
    this.#sortSquaresArr()
    this.#prepForMove()
    if (this.#hasMoved) {
      this.#animationTimeout = setTimeout(() => {
        this.#finishAnimations()
      }, state.getTransitionDuration())
    }
    return this.#hasMoved
  }

  addSquare(num, id = null) {
    const cell = id
      ? this.#table.querySelector(`.table__cell[id="${id}"]`)
      : this.#getFreePos()
    if (!cell) return false

    const square = document.createElement('div')
    square.textContent = num
    square.id = cell.id
    square.classList.add('square', `s${num}`, 'new')
    cell.append(square)
    return true
  }

  hasAvailableMoves() {
    return Array.from(this.#cells).some((cell) => {
      const square = cell.querySelector('.square')
      if (!square) return true

      const [row, column] = cell.id.split('-').map(Number)
      const neighbors = [`${row + 1}-${column}`, `${row}-${column + 1}`]
      return neighbors.some((id) => {
        const neighbor = this.#table.querySelector(`.table__cell[id="${id}"] .square`)
        return neighbor?.textContent === square.textContent
      })
    })
  }

  clear() {
    this.#finishAnimations()
    state.getUpdatedDomSquares().forEach((square) => square.remove())
  }

  #finishAnimations() {
    clearTimeout(this.#animationTimeout)
    document.querySelectorAll('.square.clone').forEach((clone) => clone.remove())
    state.getUpdatedDomSquares().forEach((square) => square.classList.remove('hide'))
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
      if (innerSquare) this.#merge(square, innerSquare)
      this.#hasMoved = true
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
  }

  #merge(square, innerSquare) {
    sound('merge')
    innerSquare.remove()
    square.textContent = Number(square.textContent) * 2
    if (square.textContent === '2048') state.showWinMessage()
    square.classList.add(`s${square.textContent}`, 'merged')
    state.addScoreValue(square.textContent)
  }

  #isCellFree(coords, posY, posX, square, value) {
    const cell = this.#table.querySelector(`.table__cell[id="${coords}"]`)
    if (!cell.hasChildNodes()) return this.#getNextCell(this.#dir, `${posY}${posX}`, square)
    const innerSquare = cell.querySelector('.square')
    const isContentEqual = innerSquare.textContent === value
    const isNotMerged = !innerSquare.classList.contains('merged')
    if (isContentEqual && isNotMerged) {
      this.#moveTo(cell, square, innerSquare, this.#dir)
    } else {
      this.#corrMov(this.#dir, `${posY}${posX}`, square)
    }
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
    const freeCells = Array.from(this.#cells).filter((cell) => !cell.querySelector('.square'))
    return freeCells[randomizer(0, freeCells.length)]
  }
}

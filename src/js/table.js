function isInternetExplorer() {
	return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
}
if (isInternetExplorer()) {
	const ie = document.querySelector('.IE');
	ie.classList.remove('hide');
}

import {
	randomizer,
	getRandNum
} from './initMove';

import {
	soundActive,
	moveSound,
	mergeSound
} from './sound';

import {
	Storage
} from './localStorageSaver'

const tranDuration = 100;
let status = false;
const body = document.querySelector('body');

export class Square {
	constructor(num, dir, id) {
		this._num = num;
		this._dir = dir;
		this._squaresArr;
		this._table = document.querySelector('.table')
		this._square = this._create();
		this._squares = document.querySelectorAll('.square');
		this._clearMerged();
		this._colorChange(this._num, this._square);

		if (this._dir != undefined) {
			if (soundActive) moveSound.play();
			this._squaresArr = this._getSquareArr();
			this._clearNewClass(this._squaresArr);
			if (this._findFreePos() == undefined) this._checkForLose();
			
			this._prepForMove().then(
				() => {
					if (status == true) {
						this._append();
						status = false;
					}
				}
			)
		} else this._append(id);

		this._saveLocal();
	}
	_saveLocal() {
		new Storage().write();
	}
	_checkForLose() {
		let hasStep = false;
		this._squaresArr = this._getSquareArr();
		this._squaresArr.forEach(sq => {
			let cells = this._getAllPosCoords(sq.id);
			cells.forEach(cell => {
				const innerSquare = cell.querySelector('.square');
				if (innerSquare == null) {
					hasStep = true;
					return;
				}
				if (innerSquare.textContent == sq.textContent && cells.length > 2) {
					hasStep = true;
					return;
				}
			})
		})
		if (hasStep == false) this._showMessage('game over');
	}
	_showMessage(mes) {
		console.log('game over');
		let message;
		if (mes == 'game over') message = document.querySelector('.lose');
		else if (mes == 'win') message = document.querySelector('.win');
		message.classList.remove('hide');
	}
	_getAllPosCoords(coords) {
		let arr = [];
		let cells = [];
		let posY = Number(coords[0]);
		let posX = Number(coords[2]);
		if (posY != 4) arr.push(`${posY+1}-${posX}`)
		if (posY != 0) arr.push(`${posY-1}-${posX}`)
		if (posX != 4) arr.push(`${posY}-${posX+1}`)
		if (posX != 0) arr.push(`${posY}-${posX-1}`)
		arr.forEach(coord => {
			let cell = this._table.querySelector(`.table__cell[id=\"${coord}\"]`);
			if (cell != null) cells.push(cell);
		})
		return cells;
	}
	_clearNewClass(arr) {
		arr.forEach(sq => {
			sq.classList.remove('new');
		})
	}
	_prepForMove() {
		for (let i = 0; i <= this._squaresArr.length - 1; i++) {
			const squares = this._getSquareArr();
			const square = squares[i];
			const startCoords = square.id.split('-');
			this._getNextCell(this._dir, startCoords, square);
			if (i == this._squaresArr.length - 1) {
				return new Promise(resolve => {
					setTimeout(() => {
						resolve(status);
					}, tranDuration * 2);
				})
			}
		}
	}
	_clearMerged() {
		this._squares.forEach(square => {
			square.classList.remove('merged');
		})
	}
	_checkForMerge(cell, square) {
		let contSquare = cell.querySelector('.square');
		if (contSquare != null && contSquare.textContent === square.textContent) return true;
		else return false;
	}
	_moveTo(cell, square, innerSquare, direct) {

		if (cell.id != square.id) {
			status = true;
			let clone = this._createClone(square);
			const startPosClone = this._getStartClonePos(square)
			this._addClone(clone, startPosClone);
			this._addOriginal(cell, square)
			this._moveClone(cell, clone, startPosClone, direct)
			setTimeout(() => {
				clone.remove();
			}, tranDuration);
			if (innerSquare != false) this._merge(square, innerSquare);
		}
	}
	_createClone(square) {
		const clone = square.cloneNode(true);
		clone.classList.add('clone')

		let width = square.getBoundingClientRect().width;
		clone.style.width = `${width}px`
		clone.style.height = `${width}px`
		return clone;
	}
	_getStartClonePos(square) {
		let startPosY = square.getBoundingClientRect().top;
		let startPosX = square.getBoundingClientRect().left;
		return [startPosY, startPosX]
	}
	_addClone(clone, startPosClone) {
		clone.style.top = `${startPosClone[0]}px`;
		clone.style.left = `${startPosClone[1]}px`;
		body.append(clone);
	}
	_moveClone(cell, clone, startPosClone, direct) {
		let border = parseInt(getComputedStyle(this._table).borderTopWidth);

		let endPosY = cell.getBoundingClientRect().top + border;
		let endPosX = cell.getBoundingClientRect().left + border;

		if (direct == 'ArrowUp' || direct == 'ArrowDown') {
			clone.style.transform = `translate(0px,${endPosY-startPosClone[0]}px)`
		} else clone.style.transform = `translate(${endPosX-startPosClone[1]}px,0px)`
	}
	_addOriginal(cell, square) {
		cell.append(square);
		square.id = cell.id;
	}
	_merge(square, innerSquare) {
		if (soundActive) mergeSound.play();
		innerSquare.remove();
		square.textContent = Number(square.textContent) * 2;
		if (square.textContent == '2048') this._showMessage('win');
		square.classList.add(`s${square.textContent}`);
		square.classList.add('merged');
		this._scoreUpdate(square.textContent);
	}
	_scoreUpdate(num) {
		let score = document.querySelector('.score').querySelector('span');
		let newScore = document.createElement('span');
		newScore.textContent = Number(score.textContent) + Number(num);
		const parent = score.parentElement;
		score.remove();
		parent.append(newScore);
	}
	_isCellFree(coords, posY, posX, square, value) {
		let cell = this._table.querySelector(`.table__cell[id=\"${coords}\"]`);
		if (!cell.hasChildNodes()) {
			this._getNextCell(this._dir, `${posY}${posX}`, square);
		} else if (cell.hasChildNodes()) {
			let innerSquare = cell.querySelector('.square');
			if (innerSquare.textContent == value && !innerSquare.classList.contains('merged')) {
				this._moveTo(cell, square, innerSquare, this._dir);
			} else {
				this._corrMov(this._dir, `${posY}${posX}`, square)
			}
		}
	}
	_corrMov(direction, coords, square) {
		let posY = Number(coords[0]);
		let posX = Number(coords[1]);
		let coordinate;
		switch (direction) {
			case ('ArrowDown'):
				posY = posY - 1;
				coordinate = `${posY}-${posX}`
				break;
			case ('ArrowUp'):
				posY = posY + 1;
				coordinate = `${posY}-${posX}`
				break;
			case ('ArrowLeft'):
				posX = posX + 1;
				coordinate = `${posY}-${posX}`
				break;
			case ('ArrowRight'):
				posX = posX - 1;
				coordinate = `${posY}-${posX}`
				break;
		}
		let cell = this._table.querySelector(`.table__cell[id=\"${coordinate}\"]`);
		this._moveTo(cell, square, false, direction);
	}
	_getNextCell(direction, startCoords, square) {
		let value = square.textContent;
		let coords;
		let posY = Number(startCoords[0]);
		let posX = Number(startCoords[1]);
		coords = `${posY}-${posX}`;
		switch (direction) {
			case ('ArrowDown'):
				if (posY != 4) {
					posY = posY + 1;
					coords = `${posY}-${posX}`;
					this._isCellFree(coords, posY, posX, square, value);
				} else {
					let cell = this._table.querySelector(`.table__cell[id=\"${coords}\"]`);
					this._moveTo(cell, square, false, direction);
				}
				break;
			case ('ArrowUp'):
				if (posY != 1) {
					posY = posY - 1;
					coords = `${posY}-${posX}`;
					this._isCellFree(coords, posY, posX, square, value);
				} else {
					let cell = this._table.querySelector(`.table__cell[id=\"${coords}\"]`);
					this._moveTo(cell, square, false, direction);
				}
				break;
			case ('ArrowLeft'):
				if (posX != 1) {
					posX = posX - 1;
					coords = `${posY}-${posX}`;
					this._isCellFree(coords, posY, posX, square, value);
				} else {
					let cell = this._table.querySelector(`.table__cell[id=\"${coords}\"]`);
					this._moveTo(cell, square, false, direction);
				}
				break;
			case ('ArrowRight'):
				if (posX != 4) {
					posX = posX + 1;
					coords = `${posY}-${posX}`;
					this._isCellFree(coords, posY, posX, square, value);
				} else {
					let cell = this._table.querySelector(`.table__cell[id=\"${coords}\"]`);
					this._moveTo(cell, square, false, direction);
				}
				break;
		}
	}
	_getSquareArr() {
		let resault = [];
		let arr = Array.prototype.slice.call(this._squares, 0);
		switch (this._dir) {
			case ('ArrowUp'):
				for (let i = this._squares.length - 1; i >= 0; i--) {
					resault.unshift(this._squares[i]);
				}
				break;
			case ('ArrowDown'):
				for (let i = this._squares.length - 1; i >= 0; i--) {
					resault.push(this._squares[i]);
				}
				break;
			case ('ArrowLeft'):
				arr.sort(function (a, b) {
					let x = a.id.substr(2, 1);
					let y = b.id.substr(2, 1);
					if (x > y) return 1;
					if (x < y) return -1;
					return 0;
				});
				resault = arr;
				break;
			case ('ArrowRight'):
				arr.sort(function (a, b) {
					let x = a.id.substr(2, 1);
					let y = b.id.substr(2, 1);
					if (x < y) return 1;
					if (x > y) return -1;
					return 0;
				});
				resault = arr;
				break;
		}
		return resault;
	}
	_findFreePos() {
		let freeCells = [];
		if (this._cells != undefined) {
			this._cells.forEach(cell => {
				if (cell.childNodes.length == "0") freeCells.push(cell);
			});
			return freeCells[randomizer(0, freeCells.length)];
		}
	}
	_create() {
		const square = document.createElement('div');
		square.classList.add('square');
		square.textContent = this._num;
		return square;
	}
	_colorChange(num, square) {
		square.classList.add(`s${num}`)
	}
	_append(id) {
		this._cells = document.querySelectorAll('.table__cell');
		if (id == undefined) {
			this._freeCell = this._findFreePos();
			if (this._freeCell.id != undefined) {
				this._square.id = this._freeCell.id;
				this._freeCell.append(this._square);
				this._square.classList.add('new');
			}
		} else {
			let target = this._table.querySelector(`.table__cell[id=\"${id}\"]`);
			this._square.id = target.id;
			this._square.classList.add('new');
			target.append(this._square);
		}
	}
}

if (localStorage[2048] === undefined) {
	initGame();
}
export function initGame() {
	new Square(getRandNum());
	new Square(getRandNum());
}

export function startMove(dir) {
	new Square(getRandNum(), dir);
}
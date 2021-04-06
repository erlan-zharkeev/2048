import {
	Square
} from './table.js';

export class Storage {
	constructor() {

	}
	_getData() {
		this._data = [];
		this._score = document.querySelector('.score').querySelector('span').textContent;
		this._squares = document.querySelectorAll('.square');
		this._data.push(this._score);
		this._squares.forEach(sq => {
			let subArr = [];
			subArr.push(sq.textContent, sq.id);
			this._data.push(subArr);
		})
		return this._data;
	}
	write() {
		let data = this._getData();
		let string = this._stringify(data);
		localStorage.setItem('2048', string)
	}
	_stringify(data) {
		return JSON.stringify(data);
	}
	_parse(data) {
		return JSON.parse(data);
	}
	read() {
		let data = localStorage.getItem('2048');
		let arr = this._parse(data);

		this._updateData(arr);
	}
	_updateData(arr) {
		this._score = document.querySelector('.score').querySelector('span').textContent = arr.shift();
		arr.forEach(sq => {
			new Square(sq[0], undefined, sq[1])
		})
	}
}

window.onload = function () {
	let lcStorage = new Storage
	if (localStorage[2048] != undefined) lcStorage.read();
}
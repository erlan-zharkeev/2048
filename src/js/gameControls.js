//game controls
import {
	initGame,
	status
} from './table';

import {
	Storage
} from './localStorageSaver';

export const settings = document.querySelector('.settings-icon');
const settingsContent = document.querySelector('.settings-content');

settings.addEventListener('click', () => {
	settingsContent.classList.toggle('hide');
});

const newGameBtn = document.querySelector('.new-game-btn');
const newGameBtnInner = document.getElementById('new-game');
const continueBtn = document.getElementById('continue');

newGameBtn.addEventListener('click', newGame);
newGameBtnInner.addEventListener('click', newGame);
continueBtn.addEventListener('click', continueGame);

function newGame() {
	const squares = document.querySelectorAll('.square');
	squares.forEach(sq => {
		sq.remove();
	})
	status = false;
	let score = document.querySelector('.score').querySelector('span');
	score.textContent = 0;
	const loseMess = document.querySelector('.lose');
	loseMess.classList.add('hide');
	initGame();
	let lcStorage = new Storage
	lcStorage.write();
}

function continueGame() {
	const winMess = document.querySelector('.win');
	winMess.classList.add('hide');
	let lcStorage = new Storage
	lcStorage.write();
}


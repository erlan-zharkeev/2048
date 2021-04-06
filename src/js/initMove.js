//init move
import {
	startMove
} from './table';

export function randomizer(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export function getRandNum() {
	const randInd = randomizer(0, 2);
	let num;
	if (randInd == 0) num = 2;
	else num = 4;
	return num;
}

document.addEventListener('keyup', createSquare);
const game = document.querySelector('.table');

let hammertime = new Hammer(game);
hammertime.get('swipe').set({
	direction: Hammer.DIRECTION_ALL,
	pointers: 1,
});

hammertime.on("swipe", function (event) {
	const dirNum = event.direction;
	switch (dirNum) {
		case 8:
			startMove('ArrowUp')
			break;
		case 16:
			startMove('ArrowDown')
			break;
		case 2:
			startMove('ArrowLeft')
			break;
		case 4:
			startMove('ArrowRight')
			break;
	}
})

export function createSquare(e) {
	const posKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
	posKey.forEach(key => {
		if (e.key == key) startMove(key)
	})
}



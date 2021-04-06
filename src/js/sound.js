//sound 
export let soundActive = false;
const icon = document.querySelector('.sound').children[0];
icon.addEventListener('click', onSound);

export const moveSound = document.getElementById('move');
export const mergeSound = document.getElementById('merge');

function onSound() {
	soundActive = true;
	icon.classList.remove('bg-no_sound');
	icon.classList.add('bg-sound');
	icon.removeEventListener('click', onSound);
	icon.addEventListener('click', offSound);
}

function offSound() {
	soundActive = false;
	icon.classList.remove('bg-sound');
	icon.classList.add('bg-no_sound');
	icon.removeEventListener('click', offSound);
	icon.addEventListener('click', onSound);
}


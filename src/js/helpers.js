export function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getRandNum() {
  return randomizer(0, 2) === 0 ? 2 : 4
}

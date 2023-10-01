export function randomizer(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function getRandNum() {
  return randomizer(0, 2) === 0 ? 2 : 4
}

export function isInternetExplorer() {
  return (
    window.navigator.userAgent.indexOf('MSIE ') > -1
    || window.navigator.userAgent.indexOf('Trident/') > -1
  )
}

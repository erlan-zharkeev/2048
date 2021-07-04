function isInternetExplorer() {
  return (
    window.navigator.userAgent.indexOf('MSIE ') > -1
    || window.navigator.userAgent.indexOf('Trident/') > -1
  )
}
if (isInternetExplorer()) {
  const ie = document.querySelector('.IE')
  ie.classList.remove('hide')
}

export const css = (el, css) => {
  for (let key in css) {
    let k = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    el.style[k] = css[key]
  }
}

export const getElementOffset = (el, direction) => {
  return Math.round(el.style[direction])
}
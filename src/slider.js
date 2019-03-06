import * as Util from './util'

class TextSlider {
  constructor() {
    this.index = 1   // 当前播放至第几张
    this.count = 0   // 总共有几张图片
    this.timer = null   // 计时器
    this.wrapper = null
    this.itemWidth = 0
    this.itemHeight = 0
    this.animated = false
    this.animationId = null
  }

  init(opts) {
    let container = document.querySelector('#' + opts.container)
    let viewport = container.querySelector('.sld-viewport')
    this.wrapper = container.querySelector('.sld-wrapper')
    let items = this.wrapper.querySelectorAll('.sld-item')
    for (let i = 0; i < items.length; i++) {
      items[i].className += ' ' + (i + 1)
    }
    this.count = items.length
    for (let i = 0; i < opts.visible_items; i++) {
      let node1 = items[i].cloneNode(true)
      this.wrapper.appendChild(node1)
      let node2 = items[this.count - 1 - i].cloneNode(true)
      this.wrapper.insertBefore(node2, this.wrapper.firstChild)
    }
    let itemStyle = window.getComputedStyle(items[0], null)
    this.itemWidth = Number(itemStyle.width.replace('px', '')) + Number(itemStyle.marginLeft.replace('px', '')) + Number(itemStyle.marginRight.replace('px', ''))
    this.itemHeight = Number(itemStyle.height.replace('px', '')) + Number(itemStyle.marginTop.replace('px', '')) + Number(itemStyle.marginBottom.replace('px', ''))
    Util.css(this.wrapper, {
      width: this.itemWidth + 'px',
      height: this.itemHeight * (this.count + opts.visible_items * 2) + 'px',
      top: -this.itemHeight * opts.visible_items + 'px'
    })
    Util.css(viewport, {
      width: this.itemWidth + 'px',
      height: this.itemHeight * opts.visible_items + 'px',
      overflow: 'hidden'
    })
    this.play()
    container.onmouseenter = this.stop.bind(this)
    container.onmouseleave = this.play.bind(this)
  }

  pre() {
    if (!this.animated) {
      if (this.index == 1) {
        this.index = this.count
      } else {
        this.index -= 1
      }

      //shownButton()
      this._animate(this.itemHeight)
    }
  }

  next() {
    if (!this.animated) {
      if (this.index == this.count) {
        this.index = 1
      } else {
        this.index += 1
      }
      //shownButton()
      this._animate(-this.itemHeight)
    }
  }

  play () {
    this.timer = setInterval(() => {
      this.next()
    }, 3000)
  }

  stop () {
    clearInterval(this.timer)
  }

  _animate(offset) {
    var time = 300
    var inteval = 10
    var speed = offset / (time / inteval)
    this.animated = true
    var newTop = parseFloat(this.wrapper.style.top) + offset
    let go = () => {
      if ((speed > 0 && parseFloat(this.wrapper.style.top) < newTop) || (speed < 0 && parseFloat(this.wrapper.style.top) > newTop)) {
        this.wrapper.style.top = parseFloat(this.wrapper.style.top) + speed + 'px'
        this.animationId = requestAnimationFrame(go)
      }
      else {
        this.animated = false
        cancelAnimationFrame(this.animationId)
        if (newTop > -this.itemHeight) {
          this.wrapper.style.top = -(this.itemHeight * this.count) + "px"
        }
        if (newTop < -(this.itemHeight * this.count)) {
          this.wrapper.style.top = -this.itemHeight + "px"
        }
      }
    }
    this.animationId = requestAnimationFrame(go)
  }
}

export default TextSlider
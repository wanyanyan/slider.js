import * as Util from './util'
const defaultValue = {
  container: null,
  visible_items: 3,
  scrolling_items: 1,
  orientation: 'horizontal',
  autoplay: true,
  interval: 3000,
  onClick: null
}

class Slider {
  constructor(options) {
    options = Object.assign({}, defaultValue, options)
    if (!options.container) {
      throw new Error('未指定有效的"container"')
    }
    this.options = options
    this.index = 1   // 当前播放至第几张
    this.count = 0   // 总共有几张图片
    this.timer = null   // 计时器
    this.wrapper = null
    this.itemWidth = 0
    this.itemHeight = 0
    this.animated = false
    this.animationId = null
    this.init()
  }

  init() {
    let container = document.querySelector('#' + this.options.container)
    let viewport = container.querySelector('.sld-viewport')
    this.wrapper = container.querySelector('.sld-wrapper')
    let items = this.wrapper.querySelectorAll('.sld-item')
    for (let i = 0; i < items.length; i++) {
      items[i].className += ' ' + (i + 1)
      Util.css(items[i], {
        display: 'block',
        float: this.options.orientation === 'vertical' ? 'initial' : 'left'
      })
      if (this.options.onClick) {
        items[i].onclick = e => {
          this.options.onClick({index: i, originalEvent: e})
        }
      }
    }
    this.count = items.length
    for (let i = 0; i < this.options.visible_items; i++) {
      let node1 = items[i].cloneNode(true)
      this.wrapper.appendChild(node1)
      let node2 = items[this.count - 1 - i].cloneNode(true)
      this.wrapper.insertBefore(node2, this.wrapper.firstChild)
      if (this.options.onClick) {
        node1.onclick = e => {
          this.options.onClick({index: i, originalEvent: e})
        }
        node2.onclick = e => {
          this.options.onClick({index: this.count - 1 - i, originalEvent: e})
        }
      }
    }
    let itemBbox = items[0].getBoundingClientRect()
    this.itemWidth = itemBbox.width
    this.itemHeight = itemBbox.height
    let wrapperStyle = {
      position: 'relative',
      display: 'block',
      margin: '0 auto'
    }
    let viewportStyle = {
      position: 'relative',
      overflow: 'hidden'
    }
    if (this.options.orientation === 'vertical') {
      Object.assign(wrapperStyle, {
        width: this.itemWidth + 'px',
        height: this.itemHeight * (this.count + this.options.visible_items * 2) + 'px',
        top: -this.itemHeight * this.options.visible_items + 'px'
      })
      Object.assign(viewportStyle, {
        width: this.itemWidth + 'px',
        height: this.itemHeight * this.options.visible_items + 'px'
      })
    } else {
      Object.assign(wrapperStyle, {
        width: this.itemWidth * (this.count + this.options.visible_items * 2) + 'px',
        height: this.itemHeight + 'px',
        left: -this.itemWidth * this.options.visible_items + 'px'
      })
      Object.assign(viewportStyle, {
        width: this.itemWidth * this.options.visible_items + 'px',
        height: this.itemHeight + 'px'
      })
    } 
    Util.css(this.wrapper, wrapperStyle)
    Util.css(viewport, viewportStyle)
    if (this.options.autoplay) {
      this.play()
      viewport.onmouseenter = this.stop.bind(this)
      viewport.onmouseleave = this.play.bind(this)
    }  
  }

  pre() {
    if (!this.animated) {
      this.index -= this.options.scrolling_items
      if (this.index < 1) {
        this.index = this.count + this.index
      }
      let offset = (this.options.orientation === 'vertical' ? this.itemHeight : this.itemWidth) * this.options.scrolling_items
      this._animate(offset)
    }
  }

  next() {
    if (!this.animated) {
      this.index += this.options.scrolling_items
      if (this.index > this.count) {
        this.index = this.index - this.count
      }
      let offset = (this.options.orientation === 'vertical' ? this.itemHeight : this.itemWidth) * this.options.scrolling_items
      this._animate(-offset)
    }
  }

  play () {
    this.timer = setInterval(() => {
      this.next()
    }, this.options.interval)
  }

  stop () {
    clearInterval(this.timer)
  }

  _animate(offset) {
    var time = 300
    var inteval = 10
    var speed = offset / (time / inteval)
    this.animated = true
    let direction = this.options.orientation === 'vertical' ? 'top' : 'left'
    var newPosition = parseFloat(this.wrapper.style[direction]) + offset
    let go = () => {
      if (Math.abs(parseFloat(this.wrapper.style[direction]) - newPosition) > 0.5) {
        this.wrapper.style[direction] = parseFloat(this.wrapper.style[direction]) + speed + 'px'
        this.animationId = requestAnimationFrame(go)
      } else {
        this.animated = false
        cancelAnimationFrame(this.animationId)
        let itemSize = this.options.orientation === 'vertical' ? this.itemHeight : this.itemWidth
        if (Math.round(newPosition) > -itemSize) {
          this.wrapper.style[direction] = Math.round(newPosition) - (itemSize * this.count) + 'px'
        }
        if (Math.round(newPosition) < -(itemSize * this.count)) {
          this.wrapper.style[direction] = Math.round(newPosition) + (itemSize * this.count) + 'px'
        }
      }
    }
    this.animationId = requestAnimationFrame(go)
  }
}

export default Slider
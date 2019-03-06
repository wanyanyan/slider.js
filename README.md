## 介绍
  一个简单的轮播组件，纯js实现，不依赖任何前端框架。
## 使用方法
在使用slider.js之前，应该确保html页面有如下Dom结构，'container'为轮播组件的容器，不要改变其子元素的class和结构。
```html
<div id="container">
  <div class="sld-viewport">
    <div class="sld-wrapper">
      <div class="sld-item">
        <!-- your content -->
      </div>
      <div class="sld-item">
        <!-- your content -->
      </div>
    </div>
  </div>
</div>
```

### 通过cdn引入

```html
<script src="/dist/slider.min.js"></script>
```

```html
<script>
  const slider = new sliderjs.Slider({
    container: 'container',
    visible_items: 1
  })
</script>
```

### 通过npm

```js
npm install slider.js
```

```js
import {Slider} from 'slider.js'
const slider = new Slider({
  container: 'container',
  visible_items: 1
})
```

## API
`new sliderjs.Slider(options)`会初始化轮播组件并返回一个`Slider`实例。options选项：

选项 | 类型 | 功能
--- | --- | ---
container | String \| HTMLElement | 指定轮播组件的容器
visible_items | Number | 可见的条目数 - 默认：`1`
scrolling_items | Number | 一次滚动的条目数 - 默认： `1`
autoplay | boolean | 是否自动开始滚动 - 默认： `true`
interval | Number | 每次滚动间隔，单位：ms - 默认：`3000`

Slider实例具有以下方法：
#### `.pre()`
切换上一个滚动条目

#### `.next()`
切换下一个滚动条目

#### `.play()`
开始自动播放

#### `.stop()`
停止自动播放

## 开发指南
安装所有依赖：
```
npm install
```
进入开发模式：
```
npm run start
```
通过浏览器打开"http://localhost:8080/debug/index.html"可进入测试页面

打包代码：
```
npm run build
```
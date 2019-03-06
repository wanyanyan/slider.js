## 介绍
  一个简单的轮播组件，纯js实现，不依赖任何前段框架。
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
import {Slider} from 'sliderjs'
const slider = new Slider({
  container: 'container',
  visible_items: 1
})
```

## 参数说明

（待更新）

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
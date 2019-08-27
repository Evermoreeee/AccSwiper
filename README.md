#acc-swiper 

> The goal is to be a high-performance tabs component ,Resolving Mobile Gestures

###使用
```
    npm install acc-swiper
```


```html

    <!-- swiper名称可以自定义的啦 -->
    <div id="swiper">
        <!-- swiper-item名称也可以自定义啦，相当于一个滑块 -->
        <div class="swiper-item">
            <img src="./images/1.jpg" />
        </div>
        <div class="swiper-item">
            <img src="./images/2.jpg" />
        </div>
        <div class="swiper-item">
            <img src="./images/3.jpg" />
        </div>
    </div>
```
```js
    import AccSwiper from 'acc-swiper'

    new AccSwiper({
        swiper: '#swiper',		// swiper节点名称
        item: '.swiper-item',	// swiper内部滑块的节点名称
        autoplay: false,		// 是否自动滑动
        duration: 3000,			// 自动滑动间隔时间
        change(index) {			// 每滑动一个滑块，插件就会触发change函数，index表示当前的滑块下标
            console.log(index);
        }
    });

```

# AccSwiper

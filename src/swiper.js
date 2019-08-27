
export default class AccSwiper {
    constructor(options = {}) {
        this.options = Object.assign({
            swiper: '#swiper',
            item: '.swiper-name',
            autoplay: false,
        }, options);

        // console.log(this.options)

        // 所有的Element对象和集合
        this.elements = {
            swiper: document.querySelector(this.options.swiper),
            items: null,
            container: null,
        };
        // console.log(this.elements)
        // 一些状态
        this.states = {
            index: 0,           // 当前滑块的下标，从0开始
            left: 0,            // container的一个left位置
            touch: 0,           // 触摸状态 0：未触摸 1：手指触摸/鼠标按下
            touchTrack: {
                start: null,    // 手指触摸/鼠标按下时的位置
                old: null,      // 手指/鼠标上一次的位置
            },
        };

        // 检测是在pc端还是移动端
        this.isTouch = 'ontouchstart' in window; 

        if (!this.elements.swiper) {
            throw `${this.options.swiper} not found`;
        }
        
        this.wrapContainer();
        this.initStyle();
        this.touchEvent();

        if (this.options.autoplay) {
            this.autoplay();
            this.elements.swiper.addEventListener('mouseover', () => {
                this.states.autoplay = false;
            });
            this.elements.swiper.addEventListener('mouseout', () => {
                this.states.autoplay = true;
            });
        }

        //resetTouchStatus
        this.direction = '';
        
        ['deltaX','deltaY','offsetX','offsetY'].forEach(item => {
            this[item] = 0
        })
    }
    
    /**
     * @private 把滑块外层再包裹一个div
     * 这个div负责整个滑块的移动
     */
    wrapContainer() {
        const html = this.elements.swiper.innerHTML;
        this.elements.swiper.innerHTML = '';
        this.elements.container = document.createElement('div');
        this.elements.container.innerHTML = html;
        this.elements.swiper.append(this.elements.container);
        this.elements.items = this.elements.swiper.querySelectorAll(this.options.item);
    }
    /**
     * @private 初始化样式
     */
    initStyle() {
        this.elements.swiper.setAttribute('style', `
            position: relative; 
            overflow: hidden;
        `);
        this.elements.container.setAttribute('style', `
            display: flex;
            width: 10000%;
            position: relative;
            left: 0;
        `);
        this.elements.items.forEach(item => {
            item.style.cssText += `width: 1%;`;
        });
    }

    /**
     * description 监听触摸事件
     */
    touchEvent() {
        if (this.isTouch) {
            this.elements.container.addEventListener('touchstart', () => this.touchStart(event));
            this.elements.container.addEventListener('touchmove', () => this.touchMove(event));
            this.elements.container.addEventListener('touchend', () => this.touchEnd(event));
        }
        else {
            this.elements.container.addEventListener('mousedown', () => this.touchStart(event));
            this.elements.container.addEventListener('mousemove', () => this.touchMove(event));
            this.elements.container.addEventListener('mouseup', () => this.touchEnd(event));
        }
    }

    touchStart(event) {

        this.resetTouchStatus()
        // 阻止浏览器默认的拖拽行为
        // event.preventDefault();

        this.states.touch = 1;
        this.states.autoplay = false;
        this.states.touchTrack.start = this.states.touchTrack.old = event.touches ? event.touches[0] : event;
        
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
    
    }
   
    getDirection(x, y) {
        const MIN_DISTANCE = 5
        if (x > y && x > MIN_DISTANCE) {
          return 'horizontal';
        }
      
        if (y > x && y > MIN_DISTANCE) {
          return 'vertical';
        }
      
        return '';
    }
    _touchMove(event) {
        var touch = event.touches[0];
        this.deltaX = touch.clientX - this.startX;
        this.deltaY = touch.clientY - this.startY;
        this.offsetX = Math.abs(this.deltaX);
        this.offsetY = Math.abs(this.deltaY);

        this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
    }
    touchMove(event) {
        let _event = event
        // 必须是手指/鼠标按下了才允许移动
        if (this.states.touch != 1) return;

        this._touchMove(_event)
        // console.log(this.direction)
        if(this.direction === 'horizontal'){
            // console.log('preventDefault')
            event.preventDefault();
        } else{
            //垂直滚动
            return;
        }
        // 触摸和鼠标事件event不一样，要区分开来。
        event = event.touches ? event.touches[0] : event;
        
        // event.pageX表示当前手指/鼠标所移动的位置
        // 而我们this.states.touchTrack.old表示手指/鼠标的上一个位置
        // 所以可以通过比对来判断是向左滑动还是向右滑动
        if (event.pageX < this.states.touchTrack.old.pageX) {
            this.states.left -= this.states.touchTrack.old.pageX - event.pageX;
        }
        else {
            this.states.left += event.pageX - this.states.touchTrack.old.pageX;
        }
        this.states.touchTrack.old = event;
        // this.elements.container.style.left = this.states.left + 'px';
        this.elements.container.style.transform = 'translateX'+ "(" + this.states.left + "px)";

    }

    touchEnd(event) {
        
        // 移除触摸状态
        this.states.touch = 0;
        this.states.autoplay = true;
        event = event.changedTouches ? event.changedTouches[0] : event;
        if (event.pageX < this.states.touchTrack.start.pageX) {
            this.states.index ++;
        }
        else {
            this.states.index --;
        }

        // 防止滑块溢出
        if (this.states.index < 0) {
            this.states.index = 0;
        }
        else if (this.states.index > this.elements.items.length - 1) {
            this.states.index = this.elements.items.length - 1;
        }
        if(this.direction === 'horizontal'){

            this.change(this.states.index);
            
        } else{
            //垂直滚动
            return;
        }
    }
    resetTouchStatus() {
        this.direction = '';
        this.deltaX = 0;
        this.deltaY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    change(index) {
        // 当前滑块的index乘以滑块宽度的相反数即为container的left位置。
        this.states.left =  - (this.elements.items[0].offsetWidth * index);
        // this.elements.container.style.left = this.states.left + 'px';
        console.log(this.states.left)
        this.elements.container.style.transform = 'translateX'+ "(" + this.states.left + "px)";
        // 用transition属性实现一个左右移动动画效果
        this.elements.container.style.cssText += `transition-duration: 0.3s`; 
        // 当动画结束后，去掉transition属性
        this.elements.container.addEventListener('transitionend', () => {
            this.elements.container.style.cssText = this.elements.container.style.cssText.replace('transition', '');
        });
        
        this.states.index = index;
        // 触发一个事件
        if (this.options.change && typeof this.options.change == 'function') {
            this.options.change.bind(this)(index);
        }
    }
   
};
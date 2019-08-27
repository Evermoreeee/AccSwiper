<template>
  <div id="app">
    <h3>轮播图</h3>
    <div id="swiper">
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

    <h3>分类组</h3>
    <div class="swiper-menus">
        <div class="swiper-item">
            <div class="menu">
                <img src="./images/menu1.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu2.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu3.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu4.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu1.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu2.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu3.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu4.png" />
                <p>分类</p>
            </div>

        </div>
        <div class="swiper-item">
            <div class="menu">
                <img src="./images/menu1.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu2.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu3.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu4.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu1.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu2.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu3.png" />
                <p>分类</p>
            </div>
            <div class="menu">
                <img src="./images/menu4.png" />
                <p>分类</p>
            </div>

        </div>
    </div>

    <h3>滑动tab切换</h3>
    <div class="tabs">
        <div class="tabs-item active">菜品</div>
        <div class="tabs-item">评价</div>
        <div class="tabs-item">商家</div>
    </div>
    <div class="swiper-tab">
        <div class="swiper-item" style="background: rgb(111, 194, 3);">这里是菜品列表</div>
        <div class="swiper-item" style="background: rgb(3, 147, 243);">这里是用户评价</div>
        <div class="swiper-item" style="background: rgb(161, 3, 140);">这里是商家信息</div>
    </div>

  </div>
</template>

<script>
import AccSwiper from './swiper'
export default {
  name: 'app',
  data () {
    return {
     
    }
  },
  mounted(){
    this.AccSwiperInit()
  },
  methods:{
    AccSwiperInit(){
      new AccSwiper({
            swiper: '#swiper',      
            item: '.swiper-item',
      });
      new Swiper({
            swiper: '.swiper-menus',
            item: '.swiper-item',
            autoplay: true,
            duration: 5000
    });
    }
  }
}
</script>

<style lang="scss">
html {
    font-size: 14px;
    font-weight: 500;
}
body {
    background: #f7f7f7;
}
* {
    margin: 0;
    padding: 0;
}
h3 {
    text-align: center;
    padding: 20px 0;
}
#swiper .swiper-item img{
    width: 100%;
}

/* 分类菜单 */
.swiper-menus .swiper-item {
    display: flex;
    flex-wrap: wrap;
}
.swiper-menus .swiper-item .menu {
    width: 15%;
    text-align: center;
    margin: 10px 5%;
}
.swiper-menus .swiper-item .menu img {
    width: 100%;
}


/* tab相关 */
.tabs {
    display: flex;
    justify-content: center;
}
.tabs .tabs-item {
    padding: 15px 0;
    text-align: center;
    width: 100%;
}
.tabs .tabs-item.active {
    background: #fff;
}
.swiper-tab .swiper-item {
    color: #fff;
    font-size: 30px;
    text-align: center;
    padding: 100px 0;
}


</style>

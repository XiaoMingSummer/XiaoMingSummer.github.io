window.onload =function(){
// 动画封装
function animate(element, target) {
    // 每次进行动画之前，先把上一个给清除了
    clearInterval(element.timerId);
    // 使用定时器让left属性，慢慢变小
    element.timerId = setInterval(function () {
      // 获取当前位置
      var current = element.offsetLeft;
      // 根据移动的方向，处理curent到底是+=还是-=
      // 从左向右，就是+=，从右向左就是-=
      // 如果当前的位置，距离目标位置要小 ，就是从左往右
      var step = 40;
      if (current <= target) {
        current += step;
      } else {
        current -= step;
      }
      element.style.left = current + 'px';
      // 判断停下
      // 只要当前位置和目标位置的距离小于10个像素，就可以停下了
      // 求目标和当前之间的距离  --- 距离是没有方向的，只有大小  绝对值  Math.abs()
      // 只要判断绝对值是否在10之间，就行，如果绝对值在10之间，就是距离小于10了
      if (Math.abs(target - current) <= step) {
        // 如果元素没有到达目标，强行设定元素到达目标位置
        element.style.left = target + 'px';
        clearInterval(element.timerId);
      }
    }, 20);
  }

     //  获取左右按钮
     var leftBtn = document.querySelector('.btn-left');
     var rightBtn = document.querySelector('.btn-right');
     // 获取图片的宽度，其实就是inner的宽度
     var imgWidth = document.querySelector('.slides').offsetWidth;
     // 获取ul
     var ul = document.getElementById('imglist');
     // 获取所有的序号
     var circles = document.querySelectorAll('.circle > span');
    //  获得停止轮播的最外的盒子
    var box = document.getElementById('box');
 
     //注册鼠标移入事件
     for (var i = 0; i < circles.length; i++) {
         // 3 还要讲序号对应的索引先保存起来
         circles[i].index = i;
         circles[i].onmouseover = function () {
             //4 根据索引计算出ul应该在的位置，设置给ul
             // 4.1 先获取序号对应的索引
             var index = this.index;
             // ul应该出去的位移 = 序号的索引 * 图片的宽度 * -1
             var target = index * imgWidth * -1;
             // 把这个目标值设置给ul的left属性
            //  ul.style.left = target + 'px';
             animate(ul, target);
             //5. 实现小圆点的样式排他
             for (var j = 0; j < circles.length; j++) {
                 // 把所有的原点的current这个class移除
                 circles[j].classList.remove('current');
             }
             this.classList.add('current');
 
             //把其他地方需要使用的currentIndex跟序号同步
             currentIndex = this.index;
         }
     }
 
 
     //把当前图片的索引，使用一个变量存储一下
     var currentIndex = 0; //因为一开始就是第一张图片，第一张图片的索引就是0
     //注册点击事件
     rightBtn.onclick = move; // 注意千万不要在这里加括号
 
     function move() {
         //如果到达了最后一张(用户认为是第一张)，立刻把ul设置为第一张，然后从第一张切换到第二张
         if (currentIndex === ul.children.length - 1) {
             // 直接把ul归零
             ul.style.left = 0;
             // 同步当前的索引
             currentIndex = 0;
         }
         // 在点击事件里面控制ul的left属性即可
         // 需要计算出ul应该到哪里 ul的位置 = 索引 * 图片宽度 * -1
         //图片要从第n张到n+1张，让索引增加
         currentIndex++;
         //计算出ul应该在哪里
         var target = currentIndex * imgWidth * -1;
         //设置给ul
         // ul.style.left = target + 'px';
         animate(ul, target);
         //排他的设置序号的样式
         for (var i = 0; i < circles.length; i++) {
             circles[i].classList.remove('current');
         }
         // 当我们的图片显示的是第6张，序号应该对应的是第一张
         if (currentIndex === ul.children.length - 1) {
             circles[0].classList.add('current');
         } else {
             // 根据currentIndex获取对应的序号
             circles[currentIndex].classList.add('current');
         }
 
     }
 
 
     leftBtn.onclick = function () {
         // 如果当前是第一张，我们应该要切换为用户认为的最后一张
         if (currentIndex === 0) {
             // 在一瞬间把图片切换到最后一张，就是所ul应该出去length-1张
             var temp = (ul.children.length - 1) * imgWidth * -1;
             ul.style.left = temp + 'px';
             // 同步索引
             currentIndex = ul.children.length - 1;
         }
         // 让图片从第n张，切换为第n-1张，让当前所以自减
         currentIndex--;
         // 计算ul的位置
         var target = currentIndex * imgWidth * -1;
         // 设置给ul
         // ul.style.left = target + 'px';
         animate(ul, target);
         //排他的设置序号的样式
         for (var i = 0; i < circles.length; i++) {
             circles[i].classList.remove('current');
         }
         // 根据currentIndex获取对应的序号
         circles[currentIndex].classList.add('current');
     }

    //  自动轮播的实现
     var timerId = setInterval(function () {
         move();
     }, 1500);
    //  获取box，注册鼠标的移入移出事件
    //  var box = document.getElementById('box');
     console.log(box);
     // 鼠标移入把自动轮播停止
     box.onmouseover = function () {
         // 停止自动轮播
         clearInterval(timerId);
     }
     // 鼠标移出，继续自动轮播
     box.onmouseout = function () {
         // 继续自动轮播
         timerId = setInterval(function () {
             move();
         }, 1500);
     }
 

}
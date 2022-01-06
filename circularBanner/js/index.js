window.addEventListener('load', function() {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var onceFlag = true; // 保证一次动画执行完成，再执行下一次动画
    console.log(focusWidth);
    // 鼠标经过focus就显示左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click(); // 手动调用点击事件
        }, 1000);
    });
    // 动态生成小圆圈按钮---有几张图片则下边显示几个圆圈
    var ul = focus.querySelector('ul');
    // 注意，滚动的是ul，并不是ul中的li
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index', i);
        // 把创建的li插入到ol里面
        ol.appendChild(li);
        // 在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            if (onceFlag) {
                onceFlag = false;
                for (var i = 0; i < ol.children.length; i++) {
                    // 排他思想，把所有的li清除current类名
                    ol.children[i].className = '';
                }
                // 被点击的li赋予current类名
                this.className = 'current';
                // 当点击某个li，就拿到当前小li的索引号
                var index = this.getAttribute('index');
                // 同时要把点击事件的index赋值给num和circle，保证点击左右侧按钮事件和点击小圆圈事件num/circle同步
                num = index;
                circle = index;
                // ul的移动距离= 小圆圈的索引号*图片宽度，因为是往左移动，所以是负值
                console.log(-index * focusWidth);
                animate(ul, -index * focusWidth, function() {
                    onceFlag = true;
                });
            }
        })
    }
    // 把ol的第一个li设置为current
    ol.children[0].className = 'current';
    // 点击右侧按钮，图片往右翻一张，定义变量num，点击一次则移动num*图片宽度，点击完一次则自增1
    var num = 0;
    // 变量circle，每次点击自增1，注意，左侧按钮也需要这个变量，因此要声明全局变量,用于控制点击左右侧按钮小圆圈跟着一起变化
    var circle = 0;
    var first = ul.children[0].cloneNode(true); // 克隆最后一张图片，因为小圆圈在此之前获取，所以小圆圈的个数正常
    ul.appendChild(first);
    arrow_r.addEventListener('click', function() {
        if (onceFlag) {
            onceFlag = false;
            // 解决图片轮播到最后一张时，再回过头播放第一张。即无缝播放：
            // 将ul第一个li（即第一张图片）复制一份(cloneNode(true)深克隆)，放到ul的最后面appendchild，
            // 当图片滚动到克隆的最后一张图片时，让ul快速的，不带动画的调到最左侧，即left为0，并将num重置为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++; // 点击一次num加一
            circle++; // 点击一次circle加一
            animate(ul, -num * focusWidth, function() {
                onceFlag = true; // 动画执行完将onceFlag置为true
            });
            // 若小圆圈走到了克隆的图片，则将circle设为0
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 指定被点到的圆圈为current类
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });
    // 左侧按钮
    arrow_l.addEventListener('click', function() {
        if (onceFlag) {
            onceFlag = false;
            // 解决图片轮播到最后一张时，再回过头播放第一张。即无缝播放：
            // 将ul第一个li（即第一张图片）复制一份(cloneNode(true)深克隆)，放到ul的最后面appendchild，
            // 当图片滚动到克隆的第一张图片时，让ul快速的，不带动画的调到最右侧，即left为-(ul.children.length - 1) * focusWidth，并将num重置为ul.children.length - 1
            if (num == 0) {
                ul.style.left = -(ul.children.length - 1) * focusWidth + 'px';
                num = ul.children.length - 1;
            }
            num--; // 点击一次num减一
            circle--; // 点击一次circle加一
            animate(ul, -num * focusWidth, function() {
                onceFlag = true;
            });
            // 若小圆圈走到了第一张图片，则将circle设为ol.children.length-1
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // 指定被点到的圆圈为current类
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
    });
    //  自动播放广告，实际上相当于是点击右侧按钮
    var timer = setInterval(function() {
        arrow_r.click(); // 手动调用点击事件
    }, 1000);





})
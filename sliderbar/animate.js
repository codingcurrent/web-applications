/**
 * 该方法是动画特效函数
 * 动画实现的原理：
 * 通过定时器setInterval() 不断移动盒子位置
 *  步骤如下：获得盒子当前位置(offsetLeft)；让盒子在当前位置加上一个移动距离(style.left)；利用定时器不断重复这个操作；加一个结束定时器的条件
 * obj 是动画特效使用的对象 target是动画特效结束的位置 callback是动画特效结束后调用的回调函数，
 * 由于要用到elment.style.left所以说obj必须要加上定位属性
 */
function animate(obj, target, callback) {
    // 缓动动画效果
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        // 步长值 = （目标位置-当前位置）/ 10
        // 把步长值改为整数 不要出现小数的问题 步长为小数则不一定能到达目标值（前进则往大取整，后退则往小取整）
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            if (callback) {
                // 若有调用函数，则执行
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 30);
}
// 该函数是匀速动画效果
function animateSt(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        if (obj.offsetLeft >= target) {
            // 停止动画
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + 1 + 'px'
    }, 30);
}
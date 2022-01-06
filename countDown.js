function countDown() {
    var nowTime = +new Date(); // 当前时间总的毫秒数
    var times = (inputTime - nowTime) / 1000; // 剩余时间的总秒数
    var h = parseInt(times / 60 / 60); // 时
    h = h < 10 ? '0' + h : h;
    hour.innerHTML = h;
    var m = parseInt(times / 60 % 60); // 分
    m = m < 10 ? '0' + m : m;
    minute.innerHTML = m;
    var s = parseInt(times % 60); // 秒
    s = s < 10 ? '0' + s : s;
    second.innerHTML = s;
    console.log(h, m, s);
}
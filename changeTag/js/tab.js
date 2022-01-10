var that;
class Tab {
    constructor(id) {
            // 获取元素
            this.main = document.querySelector(id);
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.add = this.main.querySelector('.tabadd');
            // li的父元素
            this.ul = this.main.querySelector('.firstnav');
            console.log(ul);
            this.init(); // 只要new对象就会执行该方法
            that = this;
        }
        // 1.切换功能,该方法由li调用
    toggleTab() {
            that.clearClass();
            this.className = 'liactive';
            // this.sections[this.index].className = 'conactive'; 
            that.sections[this.index].className = 'conactive';
        }
        // 2、添加功能
    addTab() {
            // 利用insertAdjacentHTML可直接把字符串格式元素添加到父元素中
            var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
            console.log(ul);
            that.ul.insertAdjacentHTML('beforeend', li); // 追加到父元素的最后面
        }
        // 3、删除功能
        // 4、修改功能
        // 5、初始化操作 让相关的元素绑定事件 页面一加载就绑定事件
    init() {
            this.add.onclick = this.addTab;
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
            }
        }
        // 清除样式方法
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
}
new Tab('#tab');
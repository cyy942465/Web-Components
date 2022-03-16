window.onload = function() {
    //获取元素
    let wrap = document.getElementById("wrap");//获取页面盒子
    let black = document.getElementById("black");//放大后黑屏
    let big = document.getElementById("big");//放大后相框
    let left = document.getElementById("left");//左按钮
    let right = document.getElementById("right");
    let img = document.getElementById("img");//放大后图片
    let list = document.getElementsByTagName("a");
    let cur = 0;//当前图片

    for(let i = 0; i < list.length; i++) {
        //添加图片的次序属性
        list[i].index = i;
        //绑定事件
        list[i].onclick = function() {
            console.log(1);
            //获取放大图片的链接
            let src = this.href;
            //获取当前图片编号
            cur = this.index
            //让两个容器显示
            black.style.display = "block";
            big.style.display = "block";
            //让相框居中显示
            wrap.style.display = "flex";
            wrap.style.justifyContent = "center";
            wrap.style.alignItems = "center";

            img.src = src;
            //左右按钮绑定
            left.onclick = function() {
                cur--;
                if(cur < 0) {
                    cur = list.length - 1;
                }
                img.src = list[cur].href;
            }
            right.onclick = function() {
                cur++;
                if(cur >= list.length) {
                    cur = 0;
                }
                img.src = list[cur].href;
            }
            //阻止跳转
            return false;
        }
    }

    //点击其他区域退出
    black.onclick = function() {
        black.style.display = "none";
        big.style.display = "none";
    }
}
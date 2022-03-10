 /*左右按钮点击完成翻页*/
 /*变量声明 */
//获取左右按钮
let btn = document.querySelectorAll(".btn");
//建立类名数组
let classArr = ["p7","p6","p5","p4","p3","p2","p1"];
//获取下划线
let lines = document.querySelectorAll("span");
//获取下划线按钮
let buttons = document.querySelectorAll(".buttons");
let lines_btn = buttons[0].children;
// console.log(lines_btn);
lines_btn = Array.from(lines_btn);//转为数组
// console.log(lines_btn);
//获取轮播图窗口
let box = document.querySelector(".box");
// console.log(box);
//计数,用于控制下划线的显示
let i = 0;
/*函数声明 */
//切换上一张函数
function prev() {
  classArr.unshift(classArr[6]);//最后一个类别到最前面
  classArr.pop();

  let lis = document.querySelectorAll("li");
  
  lis.forEach((value,index) => {
    value.setAttribute("class","");
    value.setAttribute("class",classArr[index]);
  });
  bindImg();
  i--;
  if(i < 0) {
    i = 6;
  }
  let last = i + 1;
  if(last > 6) {
    last = 0;
  }
  show(last);
}
//切换下一张函数
function next() {
  classArr.push(classArr[0]);
  classArr.shift();

  let lis = document.querySelectorAll("li");
  
  lis.forEach((value,index) => {
    value.setAttribute("class","");
    value.setAttribute("class",classArr[index]);
  });
  bindImg();
  //计数
  i++;
  if(i > 6) {
    i = 0;
  }
  let last = i - 1;
  if(last < 0) {
    last = 6;
  }
  show(last);
}
//点击图片切换功能
function bindImg() {
  let p2 = document.getElementsByClassName("p2");
  p2[0].onclick = function() {
    prev();
  }
  let p4 = document.getElementsByClassName("p4");
  p4[0].onclick = function() {
    next();
  }
}
//下划线跟随显示函数
function show(last) {
  lines[last].setAttribute("class","");
  lines[i].setAttribute("class","blue");
}
/*过程执行 */
//初始化界面
window.onload = function() {
  bindImg();
}
//左右按钮绑定事件
btn[0].onclick = function() {
  prev();
}
btn[1].onclick = function() {
  next();
}
//点击下划线切换
lines_btn.forEach((value,index) => {
  value.onclick = function() {
    if(index > i) {//向前循环
      let count = index - i;
      for(let k = 0; k < count; k++) {
        next();
      }
    } else {
      let count = i - index;
      for(let k = 0; k < count; k++) {
        prev();
      }
    }
  }
})
//计时器，每4s自动更新图片
let timer = setInterval(next,4000);
//鼠标不在box内时开始计时
box.onmouseout = function() {
  timer = setInterval(next,4000);
}
//鼠标在box时停止计时
box.onmouseover = function() {
  clearInterval(timer);
}
